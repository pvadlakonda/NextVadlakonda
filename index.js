
$(document).ready(function () {
    console.log("ready!");
    populateTable(retrieveLocalStorage());
});

function retrieveLocalStorage() {
    var retrievedData = localStorage.getItem('storedComments');
    var responses = JSON.parse(retrievedData);
    if (responses == null) {
        responses = praveenResponse;
    }
    return responses;
}

function submitData() {
    var responses = retrieveLocalStorage();
    responses.comments.push({
        "name": $("#name").val(),
        "gender": $("input[name='gender']:checked").val(),
        "suggestedName": $("#babyName").val()
    });

    $('#myForm').find('input:text').val('');
    //$('input:radio').removeAttr('checked');
    populateTable(responses);

    saveToLocalStorage(responses);
}
function saveToLocalStorage(storedComments) {
    localStorage.setItem('storedComments', JSON.stringify(storedComments));
}

function populateTable(data) {
    if (data) {
        var len = data.comments.length;

        if (len > 0) {
            clearTable();
            for (var i = 0; i < len; i++) {
                var txt = "";
                var comment = data.comments[i];
                if (comment.name && comment.gender) {
                    txt = "<tr><td>" + comment.name + "</td><td>" + comment.gender + "</td><td>" + comment.suggestedName + "</td></tr>";
                }
                if (txt != "") {
                    $("#table").append(txt).removeClass("hidden");
                }
            }
        }
    }
}

function clearTable() {
    var myTable = document.getElementById("table");
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }
}

var praveenResponse = {
    "comments": [{
        "name": "praveen",
        "gender": "Boy",
        "suggestedName": "Sachin"
    }]
}
