const options = Object.freeze({
  ROCK: 'Rock',
  PAPER: 'Paper',
  SCISSORS: 'Scissors',
});

function getRandom(number = 4) {
  return Math.floor(Math.random() * number);
}

function getRandomComputerResult() {
  const availableOptions = Object.values(options);
  const randomNumber = getRandom(availableOptions.length);
  return availableOptions[randomNumber];
}

function hasPlayerWonTheRound(player = '', computer = '') {
  const { ROCK, SCISSORS, PAPER } = options;

  return (
    (player === ROCK && computer === SCISSORS) ||
    (player === SCISSORS && computer === PAPER) ||
    (player === PAPER && computer === ROCK)
  );
}

export { getRandomComputerResult, hasPlayerWonTheRound };
