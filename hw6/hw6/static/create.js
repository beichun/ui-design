function check_string(input) {
    var warning = $("<div class='warning'></div>")
    if (input == "") {
        warning.html("Please fill blank")
    } else if (input.replace(/\s+/g, "").length == 0) {
        warning.html("Invalid spaces")
    } else {
        warning = null
    }
    return warning
}


function check_int(input) {
    var warning = $("<div class='warning'></div>")
    if (input == "") {
        warning.html("Please fill blank")
    } else if (input.replace(/\s+/g, "").length == 0) {
        warning.html("Invalid spaces")
    } else if (!/^\d+$/.test(input.replace(/\s+/g, ""))) {
        warning.html("Please fill integer")
    } else {
        warning = null
    }
    return warning
}


function check_input(input) {
    var valid = true

    $.each(["name", "image", "summary", "description"], function (index, key) { 
        var warning = check_string(input[key])
        
        if (warning != null) {
            $("#" + key + "-warning").append(warning)
            
            valid = false
        }
    });

    $.each(["attack", "durability"], function (index, key) { 
        var warning = check_int(input[key])

        if (warning != null) {
            $("#" + key + "-warning").append(warning)
            
            valid = false
        }
    });

    $.each(["player", "comment"], function (index, key) { 
        var warning = check_string(input["reviews"][0][key])
        
        if (warning != null) {
            $("#" + key + "-warning").append(warning)
            
            valid = false
        }
    });

    return valid
}


$(document).ready(function () {
    $("#submit").click(function () {
        $(".warning").empty()
        
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

        var valid = check_input(item)

        if (valid == true) {

            $.ajax({
                type: "POST",
                url: "add_item",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(item),
                success: function (response) {
                    $("#submit-row").empty()
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
            
        }

        
    });
});