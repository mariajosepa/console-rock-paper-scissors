let humanScore = 0;
let machineScore = 0;
let lastClickedChoice = "";
let globalRound = 1;
let restartClicked = false;
let playerWin = true;
let draw = false;

const round = document.querySelector(".round");
const scoringMessage = document.querySelector(".scoring-box-text");
const humanScoreDisplay = document.querySelector("#human-score > span");
const machineScoreDisplay = document.querySelector("#machine-score > span");
const restart = document.getElementById("restart");
const options = document.querySelectorAll(".btn");
const result = document.querySelector(".result");
const audioFiles = ['assets/rock1.mp3','assets/rock2.mp3','assets/rock3.mp3','assets/rock4.mp3','assets/rock5.mp3']
const audioElements = audioFiles.map(file => new Audio(file));


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
function getHumanChoice(){

    let repeat = true;
    let choice = "";

    while (repeat){
        choice = prompt("Input your choice:");
        if (choice !== null){

            choice = choice.toLowerCase();
            if (choice === "rock" || choice === "paper" || choice ==="scissors"){
                repeat = false
            }else{
                alert("Error: Invalid choice! Please choose 'rock', 'paper', or 'scissors'.");
            }
        }
        else{alert("Input cancelled. Please refresh to try again.");} 
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
    updateScore();
    updateRound();
    

}

const displayResult = (win,draw) =>{

  if (win) {
    result.innerText = "You Win!";
  }
  else if(draw){
    result.innerText = "It's a Draw!";
  }
  else{
    result.innerText = "You Lost!";
  }
}

const handleClick = (e) => {

   
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
      displayResult(playerWin,draw);
    }

      
    
}
//Assign event listeners to each option, in order to know user selection
options.forEach(option => {
    option.addEventListener('click',handleClick);
});

restart.addEventListener('click', wipe)