$(document).ready(function () {
    $("#submit").click(function () { 
        
        var item = {
            "name": $("#name").val(),
            "image": $("#image").val(),
            "attack": $("#attack").val(),
            "durability": $("#durability").val(),
            "summary": $("#summary").val(),
            "description":$("#description").val(),
            "reviews": [
                {
                    "player": $("#player").val(),
                    "comment": $("#comment").val()
                }
            ]
        }

        $.ajax({
            type: "POST",
            url: "add_item",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(item),
            success: function (response) {
                var url = response["url"]
                var link = $("<a href='" + url + "'>Go to created weapon page<\a>")
                $("#submit-row").append(link);
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
        
    });
});