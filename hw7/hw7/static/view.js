$(document).ready(function () {
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
});
