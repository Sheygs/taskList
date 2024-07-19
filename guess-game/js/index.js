const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Game Initial Values
const min = 1;
const max = 10;
const actualNumber = getRandomNumber(min, max);
let guessesLeft = 8;

// UI variables
const game = document.querySelector('.game');
const min_number = document.querySelector('.min_num');
const max_number = document.querySelector('.max_num');
const guessBtn = document.querySelector('.guess_btn');
const guessInput = document.querySelector('.guess_input');
const output = document.querySelector('.message');

min_number.textContent = min;
max_number.textContent = max;

// play Again
game.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

const result = () => {
  // validate
  let guess = parseInt(guessInput.value);

  if (isNaN(guess)) {
    showMessage(`Input a  number`, 'red');
    setMessageTime(showMessage);
  } else if (guess < min || guess > max) {
    showMessage(`Must be between the range ${min} and ${max}`, 'red');
    setMessageTime(showMessage);
    clearInput();
  } else {
    //check for winningNum
    if (guess === actualNumber) {
      gameOver(true, `${winningNum} is correct!`);
    } else {
      // Wrong Number
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        gameOver(false, `Game Over. You lost! Correct answer is ${actualNumber}`);
      } else {
        // Game continues
        guessInput.style.border = '1px solid red';
        clearInput();
        showMessage(
          `Not correct! ${
            guessesLeft > 1
              ? ` ${guessesLeft} guesses left`
              : `${guessesLeft} guess left`
          } `,
          'red',
        );
        setMessageTime(showMessage);
      }
    }
  }
};

const gameOver = (playerWon, msg) => {
  let color;
  playerWon === true ? (color = 'green') : (color = 'red');
  guessInput.disabled = true;
  guessInput.style.border = `1px solid ${color}`;
  showMessage(msg, color);
  playAgain();
};

const showMessage = (msg, color) => {
  output.style.color = color;
  output.textContent = msg;
};

const setMessageTime = (msg, time = 2000) => {
  return setTimeout(msg, time);
};

const playAgain = () => {
  guessBtn.value = 'Play Again';
  guessBtn.classList.add('play-again');
};

const clearInput = () => (guessInput.value = '');

guessBtn.addEventListener('click', result);

/*
FUNCTIONALITIES
- Player must guess a number between a min and max
- Player gets a certain amount of guess
- Notify player of guesses remaining
- Notify player of the correct answer if they loose
- Let the player choose to play again
*/
