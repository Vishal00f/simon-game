var buttonColours =["red", "blue", "green", "yellow"]
var gamePattern=[]
var userClickedPattern=[]

var started=false;
var level=0;
//when any button gets clicked the animation and sound which are going to be applied
$(".btn").click(function(){
    //we are fetching the elements id which is an attribute
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //playing sound on the button click
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level)
        nextSequence();
        started=true;
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        makeSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        startOver();
    }
    
}

function nextSequence(){
    userClickedPattern=[]
    level++;
    $("#level-title").text("Level "+level)
    randomNumber=Math.floor(Math.random()*4);
    //pick any random color from the buttoncolors array
    randomChosenColour=buttonColours[randomNumber];
    //adding new generated color to gamePattern
    gamePattern.push(randomChosenColour);

    //now we will that random button and generate a flash by id
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);

}

function makeSound(path){
    var audio =new Audio("sounds/"+path+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100)
}
//function for resetting all the values to 0
function startOver(){
    gamePattern=[];
    level=0;
    started=false;
}