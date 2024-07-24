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

export { options, getRandomComputerResult };
