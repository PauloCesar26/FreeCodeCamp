function getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

let playerScore = 0;
let computerScore = 0;

function hasPlayerWonTheRound(player, computer) {
  return(
    (player === "Rock" && computer === "Scissors") || 
    (player === "Scissors" && computer === "Paper") || 
    (player === "Paper" && computer === "Rock")
  );
}

function getRoundResults(userOption) {
    const computerResult = getRandomComputerResult();

    if(hasPlayerWonTheRound(userOption, computerResult)){
        playerScore++;
        return `Player wins! ${userOption} beats ${computerResult}`;
    }
    else if(computerResult === userOption){
        return `It's a tie! Both chose ${userOption}`;
    }
    else{
        computerScore++;
        return `Computer wins! ${computerResult} beats ${userOption}`;
    }
   
  }
  
    const playerScoreSpanElement = document.getElementById("player-score");
    const computerScoreSpanElement = document.getElementById("computer-score");
    const roundResultsMsg = document.getElementById("results-msg");
  
  function showResults(userOption) {
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;
    roundResultsMsg = getRoundResults(userOption);

    if (playerScore === 3 || computerScore === 3) {
        winnerMsgElement.innerText = `${
          playerScore === 3 ? "Player" : "Computer"
        } has won the game!`;
    
        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
      }

  
  };
  
function resetGame() {
    let playerScore = 0;
    let computerScore = 0;

    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;

    resetGameBtn.style.display = "none";
    optionsContainer.style.display = "block";
    winnerMsgElement.innerText = "";
    roundResultsMsg.innerText = "";

  };