const gameBoard = document.getElementById("gameBoard");
const winnerMessage = document.getElementById("winnerMessage");
const restartButton = document.getElementById("restartButton");
const playerInput = document.getElementById("playerInput");
const startGameButton = document.getElementById("startGameButton");
const turnIndicator = document.getElementById("turnIndicator");
const gameContainer = document.getElementById("gameContainer");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
let players = { X: "Player 1", O: "Player 2" };

// Start the game after player input
startGameButton.addEventListener("click", () => {
  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names.");
    return;
  }

  players.X = player1;
  players.O = player2;
  turnIndicator.textContent = `${players[currentPlayer]}'s Turn`;
  playerInput.style.display = "none";
  gameContainer.style.display = "block";
  createBoard();
});

// Create the game cells
function createBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = index;
    cellDiv.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cellDiv);
  });
}

// Handle cell clicks
function handleCellClick(e) {
  const cellIndex = e.target.dataset.index;

  if (board[cellIndex] || !gameActive) return;

  board[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWin()) {
    winnerMessage.textContent = `${players[currentPlayer]} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    winnerMessage.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnIndicator.textContent = `${players[currentPlayer]}'s Turn`;
}

// Check for win
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

// Restart the game
restartButton.addEventListener("click", () => {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  winnerMessage.textContent = "";
  turnIndicator.textContent = `${players[currentPlayer]}'s Turn`;
  createBoard();
});