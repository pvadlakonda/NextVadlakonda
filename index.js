$(document).ready(function() {
    console.log("ready!");
    retrieveData();
});

function retrieveData() {
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "https://api.mlab.com/api/1/databases/vadlakonda/collections/comments?apiKey=2-byIVNo-oqo6Irfu3ywY1OkJW8GY_xh",
        success: function(data) {
            populateTable(data);
        }
    });
}

function submitData() {
    var name = $("#name").val();
    // var gender = $("input[name='gender']:checked").val();
    var gender = 'Girl'; //voting ended, only option now is girl :)
    var suggestedName = $("#babyName").val();
    if (invalidData(name, gender, suggestedName)) {
        return;
    }
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/vadlakonda/collections/comments?apiKey=2-byIVNo-oqo6Irfu3ywY1OkJW8GY_xh",
        data: JSON.stringify({ "name": name, "gender": gender, "suggestedName": suggestedName }),
        type: "POST",
        contentType: "application/json",
        success: function() {
            retrieveData();
        }
    });
}

function invalidData(name, gender, suggestedName) {
    if (name === "" && gender === undefined) {
        alert("Enter you name and select a gender, please!!");
        return true;
    }
    if (name === "") {
        alert("Enter your name, please!!");
        return true;
    }
    if (gender === undefined) {
        alert("Select a gender, please!!");
        return true;
    }
    if (suggestedName === "") {
        alert("Enter your suggestion, please!!");
        return true;
    }
    return false;
}

function populateChart(boyCount, girlCount) {
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "",
            fontFamily: "fantasy"
        },
        animationEnabled: true,
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center"
        },
        theme: "theme1",
        toolTip: { enabled: false },
        data: [{
            type: "pie",
            indexLabelFontFamily: "fantasy",
            indexLabelFontSize: 20,
            startAngle: 0,
            indexLabelFontColor: "green",
            indexLabelLineColor: "darkgrey",
            indexLabelPlacement: "inside",
            toolTipContent: "{name}: {y}",
            showInLegend: true,
            indexLabel: "{y}",
            dataPoints: [
                { y: boyCount, name: "Boy", color: "skyblue" },
                { y: girlCount, name: "Girl", color: "hotpink" }
            ]
        }]
    });
    chart.render();

}

function populateTable(data) {
    var boyCount = 0;
    var girlCount = 0;
    if (data) {
        var len = data.length;

        if (len > 0) {
            clearTable();
            for (var i = 0; i < len; i++) {
                var txt = "";
                var comment = data[i];
                if (comment.name && comment.gender) {
                    txt = "<tr><td>" + comment.name + "</td><td>" + comment.gender + "</td><td>" + comment.suggestedName + "</td></tr>";
                }
                if (txt !== "") {
                    $("#table").append(txt).removeClass("hidden");
                }
                if (comment.gender === 'Boy') {
                    boyCount++;
                } else if (comment.gender === 'Girl') {
                    girlCount++;
                }
            }
        }
    }
    populateChart(boyCount, girlCount);
    clearFields();
}

function clearFields() {
    $("input[type=text], textarea").val("");
    $('input[type=radio]').each(function() {
        $(this).prop('checked', false);
    });
}

function clearTable() {
    var myTable = document.getElementById("table");
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }
}