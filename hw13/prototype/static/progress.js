$(document).ready(function () {
    
    $(".disabled").click(function () {
        alert("Finish former steps to proceed.")
    })

    console.log(status_basics);
    
    // optionally diable recipes
    var finished_learning = true
    $.each(status_basics, function (i, item) { 
        if (item['learned']==false) {
            finished_learning = false
        }
    });
    console.log(status_basics);
    
    if (!finished_learning) {
        $('#recipe-button').addClass("text-muted disabled");
        $("#recipe-button").append("<img src='https://image.flaticon.com/icons/svg/1828/1828471.svg' id='recipe-lock-icon' class='lock-icon' alt='locked'>");
        $("#recipe-lock-icon").removeClass("disabled")
        $("#recipe-lock-icon").prop("data-toggle", "tooltip")
        $("#recipe-lock-icon").prop("data-placement", "right")
        $("#recipe-lock-icon").prop("title", "Learn previous modules to unlock!")
    }

    // optionally diable quizes
    var finished_learning = true
    $.each(status_recipes, function (i, item) { 
        if (item['learned']==false) {
            finished_learning = false
        }
    });
    if (!finished_learning) {
        $('#quiz-button').addClass("text-muted disabled");
        $("#quiz-button").append(
            "<img src='https://image.flaticon.com/icons/svg/1828/1828471.svg' class='lock-icon' alt='locked'>"
        );
        $("#quiz-button").prop("data-toggle", "tooltip")
        $("#quiz-button").prop("data-placement", "right")
        $("#quiz-button").prop("title", "Learn previous modules to unlock!")
    }
    
});