let targetWord = "SYNTH";  
let revealedLetters = [];  
let score = 0;
let lives = 3;
let gameOver = false;

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

  
  cardElements.forEach((card) => {
    const imgTag = card.querySelector("img");
    if (imgTag) {
      imgTag.classList.add("hidden-img");
    }
  });

  predictionInput.value = "";
}

function handleSubmit() {
  if (gameOver) return;

  let guess = predictionInput.value.trim();
  predictionInput.value = "";

  if (!guess) return; 

  let uppercaseGuess = guess.toUpperCase();

  if (uppercaseGuess.length === 1) { 
    checkLetterGuess(uppercaseGuess);
  } else {
    checkWordGuess(uppercaseGuess);
  }
}

function checkLetterGuess(letter) {
  if (targetWord.includes(letter)) {
    let letterFound = false;
    for (let i = 0; i < targetWord.length; i++) {
      if (targetWord[i] === letter && !revealedLetters[i]) {
        revealedLetters[i] = true;
        letterFound = true;

        
        const imgTag = cardElements[i].querySelector("img");
        if (imgTag) {
          imgTag.classList.remove("hidden-img");
        }
      }
    }
    if (letterFound) {
      score += 20;
      updateScoreAndLives();
      checkWinCondition();
    }
  } else {   
    lives--;
    updateScoreAndLives();
    if (lives <= 0) {
      endGame(false);
    }
  }
}

function checkWordGuess(wordGuess) {
  if (wordGuess === targetWord) {
    for (let i = 0; i < targetWord.length; i++) {
      if (!revealedLetters[i]) {
        revealedLetters[i] = true;
        const imgTag = cardElements[i].querySelector("img");
        if (imgTag) {
          imgTag.classList.remove("hidden-img");
        }
      }
    }
    score += 100;
    updateScoreAndLives();
    endGame(true);
  } else {
    endGame(false);
  }
}

function checkWinCondition() {
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


  let hearts = "";
  for (let i = 0; i < lives; i++) {
    hearts += "♥";
  }
  livesDisplay.textContent = hearts;
}
