var salespersonName = "Salesperson";

function makeRow(obj) {
    
    var newRow = $("<div class='row'></div>");
    // newRow.addClass("row");
    
    // make salesperson column
    var salesperson = $("<div></div>");
    salesperson.addClass("col-md-2");
    salesperson.html(obj.salesperson);
    newRow.append(salesperson);
    
    // make client column
    var client = $("<div></div>");
    client.addClass("col-md-5");
    client.html(obj.client);
    newRow.append(client);
    
    // make number column
    var number = $("<div></div>");
    number.addClass("col-md-2");
    number.html(obj.reams);
    newRow.append(number);
    
    // make a cancel button
    var buttonColumn = $("<div></div>");
    buttonColumn.addClass("col-md-1");
    
    var button = $("<button></button>");
    button.addClass("btn btn-warning");
    button.prop("id", obj.id);
    button.html("X");
    
    buttonColumn.append(button);
    newRow.append(buttonColumn);
    
    return newRow;
}


var display_sales_list = function(sales) {
    $("#list").empty();
    
    $.each(sales, function(index, value) {
        var newRow = makeRow(value);
        
        $("#list").append(newRow);
    });
    
    $(".btn-warning").click(function() {
        var index = $(this).attr("id");
        console.log(index);
        delete_sale($(this).attr("id"))
        
    });
    
}

var delete_sale = function(id) {

    var data_to_save = {
        "id": id
    }
    $.ajax({
        type: "POST",
        url: "delete_sale",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data_to_save),
        success: function (response) {
            var sales = response["sales"]
            display_sales_list(sales)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var save_sale = function(new_sale) {

    $.ajax({
        type: "POST",
        url: "save_sale",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(new_sale),
        success: function (response) {
            display_sales_list(response["sales"]);
            console.log(response["clients"])
            $("#client-box").autocomplete({
                source: response["clients"]
            });
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}


function saleValid(client, reams) {
    if (typeof client == "undefined" || typeof reams == "undefined") {
        return false;
    } else {
        var valid = true;
        
        if (client.replace(/\s+/g, "").length == 0) {
            valid = false;
        } else if (reams.replace(/\s+/g, "").length == 0) {
            valid = false;
        } else if (!/^\d+$/.test(reams.replace(/\s+/g, ""))) {
            valid = false;
        }
        return valid;
    }
}

function displayWarning(client, reams) {
    // empty past warnings
    $("#client-warning").empty();
    $("#reams-warning").empty();
    
    // check reams
    
    if (reams.replace(/\s+/g, "").length == 0) {
        var reamsWarning = $("<div></div>");
        reamsWarning.html("Please fill # reams");
        // reamsWarning.addClass(".warning")
        $("#reams-warning").append(reamsWarning);
        $("#reams-box").focus();
    } else if (!/^\d+$/.test(reams.replace(/\s+/g, ""))) {
        var reamsWarning = $("<div></div>");
        reamsWarning.html("Please fill valid number");
        $("#reams-warning").append(reamsWarning);
        $("#reams-box").focus();
    }
    
    // check client
    if (client.replace(/\s+/g, "").length == 0) {
        var clientWarning = $("<div></div>");
        clientWarning.html("Please fill client");
        // clientWarning.addClass(".warning")
        $("#client-warning").append(clientWarning);
        $("#client-box").focus();
    }
}

function requestSubmit() {
    var client = $("#client-box").val();
    var reams = $("#reams-box").val();
    
    if (saleValid(client, reams)) {

        // empty past warnings
        $("#client-warning").empty();
        $("#reams-warning").empty();

        var new_sale = {
            "salesperson": salespersonName,
            "client": client,
            "reams": reams
        }
        
        save_sale(new_sale)
                
        // start typing next sale
        $("#client-box").val("");
        $("#reams-box").val("");
        $("#client-box").focus();
    } else {
        displayWarning(client, reams);
    }
}


$(document).ready(function () {
    
    display_sales_list(initial_sales)

    $("#client-box").autocomplete({
        source: initial_clients
    });

    $("#submit-button").click(function() {
        requestSubmit();
    });

    $("#reams-box").keyup(function(event) {
        if (event.which == 13) {
            // remove line break
            $("#reams-box").val(
                $("#reams-box").val().replace(/(\r\n|\n|\r)/gm, "")
            );
            requestSubmit();
        }
    });

})