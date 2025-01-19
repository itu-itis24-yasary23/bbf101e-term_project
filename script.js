// script.js

let targetWord = "SYNTH";  // For last digit = 1
let revealedLetters = [];  // Track which letters have been guessed
let score = 0;
let lives = 3;
let maxIncorrectLetters = 3;
let gameOver = false;

// DOM Elements
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const predictionInput = document.getElementById("prediction");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const cardElements = document.querySelectorAll(".card");

window.addEventListener("load", initGame);
submitBtn.addEventListener("click", handleSubmit);
resetBtn.addEventListener("click", resetGame);

function initGame() {
  score = 0;
  lives = 3;
  gameOver = false;
  revealedLetters = Array(targetWord.length).fill(false);

  updateScoreAndLives();

  // Hide letters on the cards
  cardElements.forEach((card) => {
    card.textContent = "";
    card.classList.remove("revealed");
  });

  predictionInput.value = "";
}

function handleSubmit() {
  if (gameOver) return;

  // Grab raw user input (any case) and trim whitespace
  let guess = predictionInput.value.trim();
  // Clear the input field
  predictionInput.value = "";

  // If user didn't type anything, do nothing
  if (!guess) return;

  // Convert guess to uppercase so we can compare with targetWord in uppercase
  let uppercaseGuess = guess.toUpperCase();

  // Decide if it's a single-letter guess or full-word guess
  if (uppercaseGuess.length === 1) {
    checkLetterGuess(uppercaseGuess);
  } else {
    checkWordGuess(uppercaseGuess);
  }
}

function checkLetterGuess(letter) {
  if (targetWord.includes(letter)) {
    // Reveal all occurrences of that letter
    let letterFound = false;
    for (let i = 0; i < targetWord.length; i++) {
      if (targetWord[i] === letter && !revealedLetters[i]) {
        revealedLetters[i] = true;
        cardElements[i].textContent = letter;
        cardElements[i].classList.add("revealed");
        letterFound = true;
      }
    }
    if (letterFound) {
      score += 20;
      updateScoreAndLives();
      checkWinCondition();
    }
  } else {
    // Wrong letter
    lives--;
    updateScoreAndLives();
    if (lives <= 0) {
      endGame(false);
    }
  }
}

function checkWordGuess(wordGuess) {
  if (wordGuess === targetWord) {
    // Correct full-word guess => reveal all letters
    for (let i = 0; i < targetWord.length; i++) {
      revealedLetters[i] = true;
      cardElements[i].textContent = targetWord[i];
      cardElements[i].classList.add("revealed");
    }
    score += 100;
    updateScoreAndLives();
    endGame(true);
  } else {
    // Incorrect word => immediate loss
    endGame(false);
  }
}

function checkWinCondition() {
  // If all letters are revealed => user wins
  let allRevealed = revealedLetters.every(val => val === true);
  if (allRevealed) {
    endGame(true);
  }
}

function endGame(win) {
  gameOver = true;
  if (win) {
    alert("Congratulations! You correctly guessed ‘SYNTH’ and won!");
  } else {
    alert("Game Over! You lost all your lives or guessed the wrong word.");
  }
}

function resetGame() {
  initGame();
}

function updateScoreAndLives() {
  scoreDisplay.textContent = score;
  
  // Display hearts for lives
  let hearts = "";
  for (let i = 0; i < lives; i++) {
    hearts += "♥";
  }
  livesDisplay.textContent = hearts;
}
