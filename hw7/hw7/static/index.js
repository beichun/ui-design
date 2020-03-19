function make_card(index, item) {

    var block = $("<div class='col-md-4 result-item'></div>")

    var card = $("<div class='card-example card bg-light'></div>")

    var id = item["id"]
    var image_link = $("<a href='/view/" + id + "'></a>")
    var card_img = $("<img class='card-img-top' src='" + item["img"] + "' alt='Card image'>")
    image_link.html(card_img)
    card.append(image_link)

    var card_body = $("<div class='card-body'>")
    var title = $("<h4 class='card-title'></h5>")
    title.html(item["name"])
    card_body.append(title)
    var card_summary = $("<p class='card-text card-summary'></p>")
    card_summary.html(item["summary"].slice(0, 110) + "...")
    card_body.append(card_summary)
    
    card.append(card_body)

    block.append(card)
    return block
}

function display_results(data) {
    $("#example").empty();

    $.each(data, function (index, item) { 
        
        // var result = $("<div class='row result-item'></div>")

        // var col1 = $("<div class='col-md-2'></div>")
        // col1.html(index + 1)
        // result.append(col1)

        // var col2 = $("<div class='col-md-3'></div>")
        // var weapon_image = $("<img src=" + item["img"] + " alt='weapon image'>")
        // col2.append(weapon_image)
        // result.append(col2)

        // var col3 = $("<div class='col-md-6'></div>")
        // var name = $("<a href='/view/" + item["id"] + "'>" + item["name"] + "<\a>")
        // col3.append(name)
        // result.append(col3)

        // var col4 = $("<div class='col-md-1'></div>")
        // var delete_btn = $("<button class='btn btn-danger'>X</button>");
        // delete_btn.prop("id", index)
        // col4.append(delete_btn)
        // result.append(col4)

        var result = make_card(index, item)
        // console.log(result);
        
        
        $("#example").append(result)
    });

    // $(".btn-danger").click(function () { 
    //     var index = $(this).attr("id")
    //     var send = {
    //         "id": index
    //     }
        
        
    //     $.ajax({
    //         type: "POST",
    //         url: "/delete",
    //         dataType : "json",
    //         contentType: "application/json; charset=utf-8",
    //         data: JSON.stringify(send),
    //         success: function (response) {
    //             data.splice(index, 1)
    //             $.each(data, function (i, item) { 
    //                 if (item["id"] > index) {
    //                     item["id"] -= 1
    //                 }
    //             });
                
    //             display_results(data)
    //         },
    //         error: function(request, status, error){
    //             console.log("Error");
    //             console.log(request)
    //             console.log(status)
    //             console.log(error)
    //         }
    //     });
    
    // });

}

$(document).ready(function () {
    
    display_results(data);
    // console.log(names);
    
    $("#search-box").autocomplete({
        source: names
    });

});