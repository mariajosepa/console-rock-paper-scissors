//Get machine choice

let humanScore = 0;
let machineScore = 0;

const machineWinMessage = (machineChoice,playerChoice) => "You lose! You chose " + playerChoice + " and the machine chose " + machineChoice;
const playerWinMessage = (machineChoice,playerChoice) => "You win! You chose " + playerChoice + " and the machine chose " + machineChoice;
const drawMessage = (machineChoice,playerChoice) => "It's a draw! You chose " + playerChoice + " and the machine chose " + machineChoice;
const scoreMessage = (humanScore,machineScore) => "Machine Score: " + machineScore + " Player Score: " + humanScore;

function getMachineChoice(){
    randomNumber = Math.floor(Math.random()*3)+1;

    choice = ""
    console.log(randomNumber)

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
function playRound(machineChoice, playerChoice){

    playerWin = true;
    draw = false;

    if ((machineChoice === "rock" && playerChoice === "scissors") || 
       (machineChoice === "paper" && playerChoice === "rock") ||
       (machineChoice === "scissors" && playerChoice === "paper")){
        playerWin = false;
    }
    else if (machineChoice === playerChoice){
        draw = true;
    }

    if (draw){
        console.log(drawMessage(machineChoice,playerChoice));
    }
    else if(playerWin){
        console.log(playerWinMessage(machineChoice,playerChoice));
        humanScore += 1;
    }
    else{
        console.log(machineWinMessage(machineChoice,playerChoice));
        machineScore += 1;
    }

    console.log(scoreMessage(humanScore,machineScore));
}

function playGame(){

    let round = 1;
    //let valid = false;
    //let humanChoice = "";

    while(round < 6){
        alert("Starting round number " + round);
        playRound(getMachineChoice(),getHumanChoice())
        round += 1;
    }
    console.log("Game Over!");
    console.log("The final score is:");
    console.log(scoreMessage(machineScore,humanScore));


}
 playGame()