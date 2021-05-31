
var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level=0;
var started = false;


// press a key to start the game

$(document).keydown(function(event){
    if (!started){
        $("#level-title").text("Level-"+level);
        nextSequence();
        started = true;    
    }
});

// detecting button press and play sound and animation

$(".btn").on("click",function(event){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    var lastAnswerindex = userClickedPattern.length -1;
    checkAnswer(lastAnswerindex);
});




function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level-"+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChoosenColor);

    var choosenButton = $("#"+randomChoosenColor);
    choosenButton.fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);

    

}

function playSound(name){
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play();
}

function animatePress(choosenColor){
    $("."+choosenColor).addClass("pressed");
    setTimeout(function(){
        $("."+choosenColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        });

        startOver();

    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}