// Game variables
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let currentPlayer = 'X';
let gameOver = false;
let scores = {
  'X': 0,
  'O': 0
};

// Function to handle a move
function makeMove(row, col) {
  if (board[row][col] === '' && !gameOver) {
    board[row][col] = currentPlayer;
    document.getElementById('board').children[row * 3 + col].innerText = currentPlayer;
    checkWin();
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  }
}

// Function to check for a win
function checkWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      gameOver = true;
      highlightWinningCells(i, 0, i, 1, i, 2);
      announceWinner(board[i][0]);
      return;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      gameOver = true;
      highlightWinningCells(0, i, 1, i, 2, i);
      announceWinner(board[0][i]);
      return;
    }
  }

  // Check diagonals
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    gameOver = true;
    highlightWinningCells(0, 0, 1, 1, 2, 2);
    announceWinner(board[0][0]);
    return;
  }
  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    gameOver = true;
    highlightWinningCells(0, 2, 1, 1, 2, 0);
    announceWinner(board[0][2]);
    return;
  }

  // Check for a tie
  if (!board.flat().includes('')) {
    gameOver = true;
    announceWinner(null);
  }
}

// Function to highlight winning cells
function highlightWinningCells(r1, c1, r2, c2, r3, c3) {
  const cells = document.getElementById('board').children;
  cells[r1 * 3 + c1].classList.add('win');
  cells[r2 * 3 + c2].classList.add('win');
  cells[r3 * 3 + c3].classList.add('win');
}

// Function to announce the winner and update scores
function announceWinner(winner) {
  let message;
  if (winner === null) {
    message = "It's a tie!";
  } else {
    message = `${winner} wins!`;
    scores[winner]++;
  }
  updateScoreboard();
  alert(message);
}

// Function to update the scoreboard
function updateScoreboard() {
  document.getElementById('score-x').textContent = scores['X'];
  document.getElementById('score-o').textContent = scores['O'];
}

// Function to reset the board
function resetBoard() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  gameOver = false;
  const cells = document.getElementById('board').children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].classList.remove('win');
  }
}

// Initial update of the scoreboard
updateScoreboard();
