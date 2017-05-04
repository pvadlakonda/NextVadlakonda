$(document).ready(function() {
    console.log("ready!");
    populateTable(retrieveData());
});

function retrieveData() {
    var responses;
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "https://api.mlab.com/api/1/databases/vadlakonda/collections/comments?apiKey=2-byIVNo-oqo6Irfu3ywY1OkJW8GY_xh",
        success: function(data) {
            responses = data;
        }
    });
    return responses;
}

function submitData() {
    var name = $("#name").val();
    var gender = $("input[name='gender']:checked").val();
    var suggestedName = $("#babyName").val();
    if (invalidData(name, gender)) {
        alert("Enter you name and select a gender, please!!");
        return;
    }
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/vadlakonda/collections/comments?apiKey=2-byIVNo-oqo6Irfu3ywY1OkJW8GY_xh",
        data: JSON.stringify({ "name": name, "gender": gender, "suggestedName": suggestedName }),
        type: "POST",
        contentType: "application/json"
    });
    populateTable(retrieveData());
}

function invalidData(name, gender) {
    if (name === "" || gender === undefined) {
        return true;
    }
    return false;
}

function populateTable(data) {
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
            }
        }
    }
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