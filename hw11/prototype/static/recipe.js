$(document).ready(function () {
    $("#title").append(data["name"])
    console.log("000");
    
    $("#cocktail-image").attr("src", data["image"])
    $.each(data["items"], function (i, item) { 
        
        $("#items").append(item + "<br>")
    });

    $("#video").attr("src", data["video"])

    $.each(data["steps"], function (i, item) { 
        
        $("#steps").append((i+1) + ". " + item + "<br>")
    });
});