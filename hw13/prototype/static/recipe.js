$(document).ready(function () {

    item = {
        "update_target": "recipe-" + recipe_index
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
    


    $.each(data["steps"], function (i, item) { 
        
        $("#steps").append((i+1) + ". " + item + "<br>")
    });

    
});