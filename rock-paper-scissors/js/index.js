import { options, getRandomComputerResult } from './utils.js';

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');

const rockButton = document.getElementById('rock-btn');
const paperButton = document.getElementById('paper-btn');
const scissorsButton = document.getElementById('scissors-btn');

const roundResultsMsg = document.getElementById('results-msg');
const winnerMsgElement = document.getElementById('winner-msg');
const resetGameButton = document.getElementById('reset-game-btn');
const optionsContainer = document.querySelector('.options-container');

let playerScore = 0;
let computerScore = 0;

function hasPlayerWonTheRound(player = '', computer = '') {
  const { ROCK, SCISSORS, PAPER } = options;

  return (
    (player === ROCK && computer === SCISSORS) ||
    (player === SCISSORS && computer === PAPER) ||
    (player === PAPER && computer === ROCK)
  );
}

function getRoundResults(userOption = '') {
  let result = '';
  const computerResult = getRandomComputerResult();
  const hasPlayerWon = hasPlayerWonTheRound(userOption, computerResult);

  if (userOption === computerResult) {
    result = `It's a tie! Both chose ${userOption}`;
  }

  if (hasPlayerWon) {
    playerScore += 1;
    result = `Player wins! ${userOption} beats ${computerResult}`;
  } else {
    computerScore += 1;
    result = `Computer wins! ${computerResult} beats ${userOption}`;
  }

  return result;
}

function showResults(userOption = '') {
  const result = getRoundResults(userOption);
  playerScoreEl.innerText = playerScore;
  computerScoreEl.innerText = computerScore;
  roundResultsMsg.innerText = result;

  if (playerScore === 3) {
    winnerMsgElement.textContent = 'Player has won the game!';
    resetGameButton.style.display = 'block';
    optionsContainer.style.display = 'none';
  }

  if (computerScore === 3) {
    winnerMsgElement.textContent = 'Computer has won the game!';
    resetGameButton.style.display = 'block';
    optionsContainer.style.display = 'none';
  }
}

rockButton.addEventListener('click', function () {
  showResults('Rock');
});

paperButton.addEventListener('click', function () {
  showResults('Paper');
});

scissorsButton.addEventListener('click', function () {
  showResults('Scissors');
});

resetGameButton.addEventListener('click', function () {
  computerScore = 0;
  playerScore = 0;
  playerScoreEl.innerText = 0;
  computerScoreEl.innerText = 0;
  roundResultsMsg.textContent = '';
  winnerMsgElement.textContent = '';
  resetGameButton.style.display = 'none';
  optionsContainer.style.display = 'block';
});
