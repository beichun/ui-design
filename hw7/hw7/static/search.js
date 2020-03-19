function make_card_marked(index, item) {

    var block = $("<div class='col-md-4 result-item'></div>")

    var card = $("<div class='card bg-light'></div>")

    var id = item["id"]
    var image_link = $("<a href='/view/" + id + "'></a>")
    var card_img = $("<img class='card-img-top' src='" + item["img"] + "' alt='Card image'>")
    image_link.html(card_img)
    card.append(image_link)

    var card_body = $("<div class='card-body'>")
    var title = $("<h4 class='card-title'></h5>")
    var card_summary = $("<p class='card-text card-summary'></p>")

    var st = item["position_st"]
    var en = item["position_en"]
    if (item["matched"]=="name") {
        var name = item["name"]
        var title_highlight = [name.slice(0, st), "<span class='highlight-result'>", name.slice(st, en), "</span>", name.slice(en)].join('')
        title.html(title_highlight)
        card_summary.html(item["summary"])
    } else {
        title.html(item["name"])
        var summary = item["summary"]
        var summary_highlight = [summary.slice(0, st), "<span class='highlight-result'>", summary.slice(st, en), "</span>", summary.slice(en)].join('')
        card_summary.html(summary_highlight)
    }
    
    card_body.append(title)
    card_body.append(card_summary)
    
    card.append(card_body)

    block.append(card)
    return block
}

function display_results_marked(data) {
    $("#content").empty();

    var n_items = data.length
    var row1 = $("<div class='row'></div>")
    var col = $("<div class='col-md-12'></div>")
    col.html(n_items + " results found.")
    row1.append(col)
    $("#content").append(row1)

    var row2 = $("<div id='results' class='row'></div>")
    $("#content").append(row2)

    $.each(data, function (index, item) { 
        console.log(data);
        
        var result = make_card_marked(index, item)
        
        $("#results").append(result)
    });
}

function check_input(input) {
    var valid = true
    if (input == "") {
        var warning = $("<div class='warning'>Please fill search keyword</div>")
        $("#warning").append(warning)
        valid = false
    } else if (input.replace(/\s+/g, "").length == 0) {
        var warning = $("<div class='warning'>Invalid spaces</div>")
        $("#warning").append(warning)
        valid = false
    }
    return valid
}

$(document).ready(function () {
    $("#search-box").autocomplete({
        source: names
    });

    $("#search-btn").click(function () {
        
        var input = $("#search-box").val()
        console.log(input);
        
        $("#warning").empty()
        valid = check_input(input)
        console.log(valid);

        if (valid == true) {
            $("#content").empty();
            var search_key = {
                "search_key": input
            }

            // ajax call to search
            $.ajax({
                type: "POST",
                url: "search",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(search_key),
                success: function (response) {
                    var search_result = response["result"]
                    
                    console.log(response["n_items"]);
                    
                    if (response["n_items"] == 0) {
                        $("#content").html("No results found.")
                    } else {
                        display_results_marked(search_result)
                    }                
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
})