// script.js

// ======== GLOBAL VARIABLES (Adjust as needed) =========
let targetWord = "ADIEU";  // If your last digit is 0, default to "ADIEU."
                          // Change this to whichever 5-letter word matches your last digit.
let revealedLetters = [];  // Keep track of which letters have been correctly guessed
let score = 0;
let lives = 3;
let maxIncorrectLetters = 3; // after 3 wrong letter guesses -> lose
let gameOver = false;

// HTML ELEMENTS
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const predictionInput = document.getElementById("prediction");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const cardElements = document.querySelectorAll(".card");

// Initialize the game on page load
window.addEventListener("load", initGame);
submitBtn.addEventListener("click", handleSubmit);
resetBtn.addEventListener("click", resetGame);

function initGame() {
  // Reset all
  score = 0;
  lives = 3;
  gameOver = false;
  revealedLetters = Array(targetWord.length).fill(false);

  // Update DOM
  updateScoreAndLives();
  // Hide letter images or text
  cardElements.forEach((card, idx) => {
    card.textContent = "";         // Hide the letter
    card.classList.remove("revealed");
  });

  predictionInput.value = "";
}

// Handle the user pressing "Submit"
function handleSubmit() {
  if (gameOver) return;

  let guess = predictionInput.value.trim().toUpperCase();
  predictionInput.value = "";

  if (!guess) return; // If no input

  // Check if guess is a single letter or a full word
  if (guess.length === 1) {
    // Single letter guess
    checkLetterGuess(guess);
  } else {
    // Full word guess
    checkWordGuess(guess);
  }
}

// Check a single-letter guess
function checkLetterGuess(letter) {
  // If the letter is in the word, reveal it & add score
  if (targetWord.includes(letter)) {
    // Reveal all occurrences of that letter
    let letterFound = false;
    for (let i = 0; i < targetWord.length; i++) {
      if (targetWord[i] === letter) {
        // reveal the letter
        revealedLetters[i] = true;
        letterFound = true;
        // Update the card display
        cardElements[i].textContent = letter;
        cardElements[i].classList.add("revealed");
      }
    }

    if (letterFound) {
      score += 20;
      updateScoreAndLives();
      checkWinCondition();
    }
  } else {
    // Incorrect letter guess
    lives--;
    updateScoreAndLives();
    if (lives <= 0) {
      endGame(false);
    }
  }
}

// Check a full-word guess
function checkWordGuess(wordGuess) {
  if (wordGuess === targetWord) {
    // Correct full-word guess => big win
    // Reveal all letters
    for (let i = 0; i < targetWord.length; i++) {
      revealedLetters[i] = true;
      cardElements[i].textContent = targetWord[i];
      cardElements[i].classList.add("revealed");
    }

    // Let's award points for each letter correctly guessed as well:
    // For a correct word guess, you could, for example, add 100 points or 20 * word length
    score += 100; 
    updateScoreAndLives();
    endGame(true);
  } else {
    // Incorrect full word => immediate loss
    endGame(false);
  }
}

// Check if all letters are revealed
function checkWinCondition() {
  // If every position in revealedLetters is true => user found all letters
  let allRevealed = revealedLetters.every(val => val === true);
  if (allRevealed) {
    // All letters found => user wins
    endGame(true);
  }
}

// End the game (win or lose)
function endGame(win) {
  gameOver = true;
  if (win) {
    alert("Congratulations! You guessed the word correctly and won the game!");
  } else {
    alert("Game Over! You lost all your lives or made a wrong full-word guess.");
  }
}

// Reset the game to initial state
function resetGame() {
  initGame();
}

// Update the scoreboard and the hearts display
function updateScoreAndLives() {
  scoreDisplay.textContent = score;
  // Display hearts as per the remaining lives
  let hearts = "";
  for (let i = 0; i < lives; i++) {
    hearts += "♥";
  }
  livesDisplay.textContent = hearts;
}
