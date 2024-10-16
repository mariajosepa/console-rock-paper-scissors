let humanScore = 0;
let machineScore = 0;
let lastClickedChoice = "";
let globalRound = 1;
let restartClicked = false;

const round = document.querySelector(".round");
const scoringMessage = document.querySelector(".scoring-box-text");
const humanScoreDisplay = document.querySelector("#human-score > span");
const machineScoreDisplay = document.querySelector("#machine-score > span");
const restart = document.getElementById("restart");
const options = document.querySelectorAll(".btn");
const result = document.querySelector(".result");
const audioFiles = ['assets/rock1.mp3','assets/rock2.mp3','assets/rock3.mp3','assets/rock4.mp3','assets/rock5.mp3']
const audioElements = audioFiles.map(file => new Audio(file));
const lossSound = new Audio('assets/fail.mp3');
const winSound = new Audio('assets/win.mp3');
const drawSound = new Audio('assets/draw.mp3');


const machineWinMessage = (machineChoice,playerChoice) => "You lose! You chose " + playerChoice + " and the machine chose " + machineChoice;
const playerWinMessage = (machineChoice,playerChoice) => "You win! You chose " + playerChoice + " and the machine chose " + machineChoice;
const drawMessage = (machineChoice,playerChoice) => "It's a draw! You chose " + playerChoice + " and the machine chose " + machineChoice;
const scoreMessage = (humanScore,machineScore) => "Machine Score: " + machineScore + " Player Score: " + humanScore;

document.addEventListener('DOMContentLoaded', () => {
    updateScore();
    updateRound();
});

function getMachineChoice(){
    randomNumber = Math.floor(Math.random()*3)+1;

    choice = ""
   
    if (randomNumber === 1){
        choice = "rock";
    }
    else if (randomNumber === 2){
        choice = "paper";
    }
    else{
        choice = "scissors";
    }
    return choice
}
const playSound = () =>{
    randomNumber = Math.floor(Math.random()*5);
    audioElements[randomNumber].play();
    

}

const updateScore = () =>{
    humanScoreDisplay.innerText = humanScore;
    machineScoreDisplay.innerText = machineScore;
}

const updateRound = () => {

    if (globalRound < 6){ 
      round.innerText = globalRound;
    }
    
}

const wipe = () =>{

    humanScore = 0;
    machineScore = 0;
    globalRound = 1;
    scoringMessage.innerText = "";
    result.innerText = "";
    updateScore();
    updateRound();
    

}

const displayResult = () =>{

  if (humanScore > machineScore) {
    result.innerText = "You Win!";
    winSound.play();
  }
  else if(humanScore == machineScore){
    result.innerText = "It's a Draw!";
    drawSound.play();
  }
  else{
    result.innerText = "You Lost!";
    lossSound.play();
  }
}

const handleClick = (e) => {

    let playerWin = true;
    let draw = false;

   
    globalRound += 1;
    if (globalRound <= 6){
        
        console.log(globalRound);
        
        const clickedChoice = e.target.id;

        if (clickedChoice === "rock"){
            playSound();
        }

        machineChoice = getMachineChoice();
  
        if ((machineChoice === "rock" && clickedChoice === "scissors") || 
        (machineChoice === "paper" && clickedChoice === "rock") ||
        (machineChoice === "scissors" && clickedChoice === "paper")){
            playerWin = false;
        }
        else if (machineChoice === clickedChoice){
            draw = true;
        }

        if (draw){
            scoringMessage.innerText = drawMessage(machineChoice,clickedChoice);
        }
        else if(playerWin){
            scoringMessage.innerText = playerWinMessage(machineChoice,clickedChoice);
            humanScore += 1;
        }
        else{
            scoringMessage.innerText = machineWinMessage(machineChoice,clickedChoice);
            machineScore += 1;
        }
        
        updateScore();
        updateRound(); 
    }

    if (globalRound === 6) {
      displayResult();
    }

      
    
}
//Assign event listeners to each option, in order to know user selection
options.forEach(option => {
    option.addEventListener('click',handleClick);
});

restart.addEventListener('click', wipe)