let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

$(document).keypress((event)=>{
    if(event.key === 'a' || 'A'){
        if(!gameStarted){
            nextSequence();
            gameStarted=true;
        }
    }
})

animatedPressed=(color)=>{
    $("#" + color).addClass("pressed");
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 100);
}

playSound=(color)=>{
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

gameOver=()=>{
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, press any key to restart");
}

nextSequence=()=>{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

checkAnswer=(currentLevel)=>{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        gameOver();
        startOver();
    }
}

startOver=()=>{
    level=0;
    gamePattern=[];
    gameStarted=false;

}

$(".btn").click(function() {
    let color = $(this).attr("id");
    userClickedPattern.push(color);
    playSound(color);
    animatedPressed(color);
    console.log(userClickedPattern.length-1);
    checkAnswer(userClickedPattern.length-1);
});