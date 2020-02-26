var display_lists = function(nppc, ppc) {
    
    $.each(["#nppc-list", "#ppc-list"], function (i, selector) { 
        $(selector).empty()

        var name_list = [nppc, ppc][i]

        $.each(name_list, function (index, name) {

            var person = $("<div class='name'></div>")
            person.html((index + 1) + ": " + name)
            $(selector).append(person)
        })

    });

    $(".name").draggable({
        revert: true,

        start: function() {
            $("#nppc, #ppc").addClass("dark")
        },

        stop: function() {
            $("#nppc, #ppc").removeClass("dark")
        }
    })

    $(".name").hover(
        function() {
            $(this).addClass("highlight")
        },
        function() {
            $(this).removeClass("highlight")
        }
    )
}

var move_to_ppc = function(name) {
    $.ajax({
        type: "POST",
        url: "move_person",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {"name": name,
            "target": "ppc"}
        ),
        dataType: "json",
        success: function (response) {
            var ppc = response["ppc"]
            var nppc = response["nppc"]
            display_lists(nppc, ppc)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var move_to_non_ppc = function(name) {
    $.ajax({
        type: "POST",
        url: "move_person",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {"name": name,
            "target": "nppc"}
        ),
        dataType: "json",
        success: function (response) {
            var ppc = response["ppc"]
            var nppc = response["nppc"]
            display_lists(nppc, ppc)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function() {
    
    display_lists(initial_nppc, initial_ppc)

    $("#ppc").droppable({
        over: function () {
            $(this).addClass("darker")
        },
        out: function () {
            $(this).removeClass("darker")
        },
        drop: function (event, ui) {

            $(this).removeClass("darker")

            var dropped_name = ui.draggable.html().slice(3)

            move_to_ppc(dropped_name)
        }
    })

    $("#nppc").droppable({
        over: function () {
            $(this).addClass("darker")
        },
        out: function () {
            $(this).removeClass("darker")
        },
        drop: function (event, ui) {

            $(this).removeClass("darker")

            var dropped_name = ui.draggable.html().slice(3)

            move_to_non_ppc(dropped_name)
        }
    })
})