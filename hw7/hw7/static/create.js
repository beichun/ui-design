// function check_string(input) {
//     var warning = $("<div class='warning'></div>")
//     if (input == "") {
//         warning.html("Please fill blank")
//     } else if (input.replace(/\s+/g, "").length == 0) {
//         warning.html("Invalid spaces")
//     } else {
//         warning = null
//     }
//     return warning
// }


// function check_int(input) {
//     var warning = $("<div class='warning'></div>")
//     if (input == "") {
//         warning.html("Please fill blank")
//     } else if (input.replace(/\s+/g, "").length == 0) {
//         warning.html("Invalid spaces")
//     } else if (!/^\d+$/.test(input.replace(/\s+/g, ""))) {
//         warning.html("Please fill integer")
//     } else {
//         warning = null
//     }
//     return warning
// }


// function check_input(input) {
//     var valid = true

//     $.each(["name", "image", "summary", "description"], function (index, key) { 
//         var warning = check_string(input[key])
        
//         if (warning != null) {
//             $("#" + key + "-warning").append(warning)
            
//             valid = false
//         }
//     });

//     $.each(["attack", "durability"], function (index, key) { 
//         var warning = check_int(input[key])

//         if (warning != null) {
//             $("#" + key + "-warning").append(warning)
            
//             valid = false
//         }
//     });

//     $.each(["player", "comment"], function (index, key) { 
//         var warning = check_string(input["reviews"][0][key])
        
//         if (warning != null) {
//             $("#" + key + "-warning").append(warning)
            
//             valid = false
//         }
//     });

//     return valid
// }

function check_spaces(id) {
    var val = $("#" + id).val()
    
    if (val.replace(/\s+/g, "").length == 0) {
        return false
    } else {
        return true
    }
}

function get_feedback(feedback) {
    var template = $("<div class='invalid-feedback'></div>")
    template.html(feedback)
    return template
}

function validate_string(input_s, parent_s, name) {
    var val = $(input_s).val().trim()
    var valid = true
    
    if (val.length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(get_feedback("Please provide a " + name + "."))
        valid = false;
    } else if (val.replace(/\s+/g, "").length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(get_feedback("Invalid spaces."))
        valid = false
    }
    return valid
}

function validate_int(input_s, parent_s, name) {
    var val = $(input_s).val()
    var valid = true
    
    if (val.length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(get_feedback("Please provide a " + name + " value."))
        valid = false;
    } else {
        var val = Number(val)        
        
        if (val==NaN || (!Number.isInteger(val))) {
            
            $(input_s).addClass("is-invalid")
            $(parent_s).append(get_feedback("Please use integer."))
            valid = false;
        } else if (val<1 || val>99) {
            $(input_s).addClass("is-invalid")
            $(parent_s).append(get_feedback("Please use number between 1 and 99."))
            valid = false;
        }
    }
    return valid
}

function validate_image_url(input_s, parent_s) {
    var val = $(input_s).val().trim()
    var valid = true

    if (val.length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(get_feedback("Please provide a url."))
        valid = false;
    } else if (val.replace(/\s+/g, "").length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(get_feedback("Invalid spaces."))
        valid = false
    }
    //  else if ((!val.endsWith(".jpg")) && (!val.endsWith(".png")) && (!val.endsWith(".jpeg")) && (!val.endsWith(".svg"))) {
    //     $(input_s).addClass("is-invalid")
    //     $(parent_s).append(get_feedback("Please provide a image link that ends with \".jpg\", \".jpeg\", \".png\", or\".svg\" ."))
    //     valid = false
    // }
    return valid
}

function validate_inputs() {
    var valid = true

    // validate name
    name = $("#input-name").val().trim()
    var included = false
    $.each(names, function (index, name_used) {
        name_used = name_used.toLowerCase()
        if (name.toLowerCase()==name_used) {
            included = true
        }
    });
    if (included) {
        $("#input-name").addClass("is-invalid")
        $("#form-name").append(get_feedback("Name have already been taken. Please use a different name."))
        valid = false;
    } else if (!validate_string("#input-name", "#form-name", "name")) {
        valid = false
    }

    // validate attack
    if (!validate_int("#input-attack", "#form-attack", "attack")) {
        valid = false
    }

    // validate durability
    if (!validate_int("#input-durability", "#form-durability", "durability")) {
        valid = false
    }

    // validate image url
    if (!validate_image_url("#input-image", "#form-image")) {
        valid = false
    }

    // validate summary
    if (!validate_string("#input-summary", "#form-summary", "summary")) {
        valid = false
    }
    

    // validate description
    if (!validate_string("#input-description", "#form-description", "description")) {
        valid = false
    }

    // validate user name
    if (!validate_string("#input-username", "#form-username", "username")) {
        valid = false
    }

    // validate comment
    if (!validate_string("#input-comment", "#form-comment", "comment")) {
        valid = false
    }

    return valid
}

$(document).ready(function () {

    $('.alert').hide()

    $("#new-form").submit(function(event) {
        event.preventDefault()

        console.log("submit");
        
        $(".form-control").removeClass("is-invalid")
        $(".invalid-feedback").remove()
        var valid = validate_inputs()
        console.log(valid);

        if (valid) {
            var item = {
                "name": $("#input-name").val().trim(),
                "img": $("#input-image").val(),
                "attack": $("#input-attack").val().trim(),
                "durability": $("#input-durability").val().trim(),
                "summary": $("#input-summary").val().trim(),
                "description":$("#input-description").val().trim(),
                "reviews": [
                    {
                        "marked_as deleted": false,
                        "player": $("#input-username").val().trim(),
                        "comment": $("#input-comment").val().trim()
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
                    console.log("success");
                    $('.alert').show()
                    $("#success-notification").empty()
                    $("#success-notification").html("New weapon successfully created. <a href='" + response["url"] + "'>Go to created weapon page<\a>")
                    // var url = response["url"]
                    // var link = $("<a href='" + url + "'>Go to created weapon page<\a>")
                    // $("#success-notification").append(link);
                    $(".form-control").val("")
                    $("#input-name").focus();
                },
                error: function(request, status, error){
                    console.log("Error");
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            });
        }
        
    })

});