/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// Get DOM elements
const resetButton = document.querySelector(".btn-new");
const holdButton = document.querySelector(".btn-hold");
const rollButton = document.querySelector(".btn-roll");
const playerOneName = document.querySelector(".player-0-panel .player-name");
const playerTwoName = document.querySelector(".player-1-panel .player-name");
const playerOneScore = document.querySelector(".player-0-panel .player-score");
const playerTwoScore = document.querySelector(".player-1-panel .player-score");
const playerOneCurrentScore = document.querySelector(".player-0-panel .player-current-score");
const playerTwoCurrentScore = document.querySelector(".player-1-panel .player-current-score");
const diceImage = document.querySelector(".dice");
const panelOne = document.querySelector(".player-0-panel");
const panelTwo = document.querySelector(".player-1-panel");

// Players
const playerOne = {
  name: 'Player 1',
  currentScore: 0,
  totalScore: 0
};

const playerTwo = {
  name: 'Player 2',
  currentScore: 0,
  totalScore: 0
};

// Dah Pig Game
const pigGame = {
  resetGame: () => {
    playerOne.name = 'Player 1';
    playerTwo.name = 'Player 2';
    playerOne.currentScore = 0;
    playerOne.totalScore = 0;
    playerTwo.currentScore = 0;
    playerTwo.totalScore = 0;
    activePlayer = playerOne;
    view.displayReset();
    view.displayActivePlayer();
  },
  switchPlayer: () => {
    if (activePlayer === playerOne) {
      activePlayer = playerTwo;
    } else {
      activePlayer = playerOne;
    };
  },
  rollDice: () => {
    let diceResult = Math.floor(Math.random()* 6) + 1;
    diceImage.style.display = 'block';
    view.displayDiceFace(diceResult);
    if (diceResult === 1) {
      activePlayer.currentScore = 0;
      activePlayer.totalScore += 0;
      view.displayCurrentScore(activePlayer.currentScore);
      pigGame.switchPlayer();
      view.displayActivePlayer();
    } else {
      activePlayer.currentScore += diceResult;
      view.displayCurrentScore(activePlayer.currentScore);
    };
  },
  holdScore: () => {
    activePlayer.totalScore += activePlayer.currentScore;
    activePlayer.currentScore = 0;
    view.displayCurrentScore(activePlayer.currentScore);
    view.displayTotalScore(activePlayer.totalScore);
    if (activePlayer.totalScore >= 100) {
      activePlayer.name = 'WINNER!'
      view.displayWinner();
    } else {
      pigGame.switchPlayer();
      view.displayActivePlayer();
    };
  }
};

//Event handlers
resetButton.addEventListener('click', () => {
  pigGame.resetGame();
});

rollButton.addEventListener('click', () => {
  pigGame.rollDice();
});

holdButton.addEventListener('click', () => {
  pigGame.holdScore();
});
  

// Display in the DOM
const view = {
  displayDiceFace: diceResult => {
    diceImage.src = "dice-" + diceResult + ".png";
  },
  displayCurrentScore: currentScore => {
    if (activePlayer === playerOne) {
      playerOneCurrentScore.innerHTML = currentScore;
    } else {
      playerTwoCurrentScore.innerHTML = currentScore;
    };
  },
  displayTotalScore: totalScore => {
    if (activePlayer === playerOne) {
      playerOneScore.innerHTML = totalScore;
    } else {
      playerTwoScore.innerHTML = totalScore;
    };
  },
  displayActivePlayer: () => {
    if (activePlayer === playerOne) {
      panelOne.classList.add("active");
      panelTwo.classList.remove("active");
    } else {
      panelTwo.classList.add("active");
      panelOne.classList.remove("active");
    };
  },
  displayWinner: () => {
    if (activePlayer === playerOne) {
      playerOneName.innerHTML = 'WINNER!'
      panelOne.classList.add("winner");
    } else {
      playerTwoName.innerHTML = 'WINNER!'
      panelTwo.classList.add("winner");
    };
  },
  displayReset: () => {
    playerOneScore.innerHTML = playerOne.totalScore;
    playerTwoScore.innerHTML =  playerTwo.totalScore;
    playerOneName.innerHTML = playerOne.name;
    playerTwoName.innerHTML = playerTwo.name;
    diceImage.style.display = 'none';
    playerOneCurrentScore.innerHTML = 0;
    playerTwoCurrentScore.innerHTML = 0;
    panelOne.classList.remove("winner");
    panelTwo.classList.remove("winner");
  }
};

// Default when the page is loaded
let activePlayer = playerOne;
view.displayReset();