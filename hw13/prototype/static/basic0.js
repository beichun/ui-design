$(document).ready(function () {

    item = {
        "update_target": "basics-0"
    }

    $.ajax({
        type: "POST",
        url: "/update_progress",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        success: function (response) {
            console.log("success");
            console.log(response)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
});