var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickPattern = [];
var gameStarted = false;
var level = 0;

$(document).keydown(function() {
    if(!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Failed");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    console.log("nextSequence called");

    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var num = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
