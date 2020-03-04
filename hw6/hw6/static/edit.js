console.log("in edit");

function displayInfo() {
    $(".name").append(item["name"]);
    $("#edit").prop("href", "/edit/" + item["id"])

    $("#attack").append(item["attack"]);
    $("#durability").append(item["durability"]);

    $("#image").append("<img src='" + item["img"] + "'>")

    $("#summary").append(item["summary"]);
    $("#description").append(item["description"]);

    $.each(item["reviews"], function (index, item) { 
        var review = $("<div class='row'></div>")
        
        var col1 = $("<div class='col-md-2'></div>")
        col1.html(item["player"])
        review.append(col1)

        var col2 = $("<div class='col-md-10'></div>")
        col2.html(item["comment"])
        review.append(col2)

        $("#reviews").append(review);
    });
}

$(document).ready(function () {
    displayInfo()

    $("#submit").click(function () { 
        var name = $("#name").val()
        var comment = $("#comment").val()

        var review = {
            "id": item["id"],
            "name": name,
            "comment": comment
        }
        
        $.ajax({
            type: "POST",
            url: "/add_review",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(review),
            success: function (response) {
                window.location.href = "http://127.0.0.1:5000/view/" + item["id"]
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
        
    });

    $("#discard").click(function () { 
        window.location.href = "http://127.0.0.1:5000/view/" + item["id"]
        
    });
});
