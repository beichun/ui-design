function update_progress_bar(quiz_status) {
    var finished = 0
    console.log(quiz_status);
    
    $.each(quiz_status, function (i, item) { 
       if (item['learned']) {
           finished += 1
       }
    });

    var new_progress = 100 * finished/5.0
    $(".progress-bar").attr('aria-valuenow', new_progress).css('width', new_progress+'%')    

    $("#submit-quiz-button").removeClass("disabled")
}


$(document).ready(function () {
    
    // make progress bar
    update_progress_bar(quiz_status)

    $(".card-body").data({
        'originalLeft': $(this).css('left'),
        'origionalTop': $(this).css('top')
    });

    $(".reset").click(function() {
        $(this).css({
            'left': $(this).data('originalLeft'),
            'top': $(this).data('origionalTop')
        });
    });

    $(".draggable").draggable({
        revert: true,

        start: function() {
            $(".droppable-dashes").removeClass("d-none")
        },

        stop: function() {
            $(".droppable-dashes").addClass("d-none")
        }
    })

    $("#mix-button").click(function (e) { 
        e.preventDefault();
        
        item = {
            "update_target": "quiz-" + quiz_index
        }    
    
        $.ajax({
            type: "POST",
            url: "/update_progress",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(item),
            success: function (response) {
                console.log("success");
                console.log(response["status"]["quizes"])
                update_progress_bar(response["status"]["quizes"])
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    });

    $("")
});