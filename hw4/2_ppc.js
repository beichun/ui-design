var employees = [
    "Phyllis",
    "Angela",
    "Dwight",
    "Oscar",
    "Creed",
    "Pam",
    "Jim",
    "Stanley",
    "Michael",
    "Kevin",
    "Kelly"
    ]


var nppc = employees
var ppc = []

function generateDraggable(index, name) {

    var newName = $("<div></div>")
    newName.html((index + 1) + ": " + name)
    newName.addClass("name")

    return newName
}

function makeNames() {

    $.each(["#nppc-list", "#ppc-list"], function (i, selector) {

        $(selector).empty()

        var name_list = [nppc, ppc][i]
        console.log(name_list)

        $.each(name_list, function (index, name) {

            var person = generateDraggable(index, name)
            $(selector).append(person)
        })


    })

    $(".name").draggable({
        revert: true,

        start: function(event, ui) {
            $("#nppc").addClass("dark")
            $("#ppc").addClass("dark")
        },

        stop: function(event, ui) {
            $("#nppc").removeClass("dark")
            $("#ppc").removeClass("dark")
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

function updateNames(name, from, to) {
    // console.log(nppc, ppc)
    // console.log(nppc)

    // remove name
    var index = eval(from).indexOf(name)
    eval(from).splice(index, 1)

    // console.log(ppc)
    // add name
    eval(to).push(name)
    // console.log(ppc)

}

function dropHandler(event, ui, current) {

    console.log(event)
    current.removeClass("darker")

    // get dropped name
    name = ui.draggable.html().slice(3)
    console.log("dropped:" + name)


    var parent_id = ui.draggable.parent().attr('id')
    var from
    console.log("id:" + parent_id)
    if (parent_id == "nppc-list") {
        from = "nppc"
    } else {
        from = "ppc"
    }

    // update names array
    updateNames(name, from, current.attr('id'))

    // update interface
    makeNames()

}

$(document).ready(function () {
    makeNames()

    $("#ppc").droppable({

        over: function (event, ui) {
            $(this).addClass("darker")
        },

        out: function (event, ui) {
            $(this).removeClass("darker")
        },

        drop: function (event, ui) {
            dropHandler(event, ui, $(this))
        }

    })

    $("#nppc").droppable({

        over: function (event, ui) {
            $(this).addClass("darker")
        },

        out: function (event, ui) {
            $(this).removeClass("darker")
        },

        drop: function (event, ui) {
            dropHandler(event, ui, $(this))
        }

    })
})