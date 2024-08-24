# PRODIGY_WD_3
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-Tac-Toe</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="game-container">
        <h1>Tic-Tac-Toe</h1>
        <div class="board" id="board">
            <!-- 9 squares for the tic-tac-toe board -->
            <div class="square" data-index="0"></div>
            <div class="square" data-index="1"></div>
            <div class="square" data-index="2"></div>
            <div class="square" data-index="3"></div>
            <div class="square" data-index="4"></div>
            <div class="square" data-index="5"></div>
            <div class="square" data-index="6"></div>
            <div class="square" data-index="7"></div>
            <div cla
/* Basic Reset */
body, div, button {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Center the game container on the page */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
}

.game-container {
    text-align: center;
}

.board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
    margin-bottom: 20px;
}

.square {
    width: 100px;
    height: 100px;
    background: #fff;
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    cursor: pointer;
    transition: background 0.3s ease;
}

.square:hover {
    background: #e0e0e0;
}

#status {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

button {
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
}

button:hover {
    background-color: #2980b9;
}

const board = document.getElementById('board');
const status = document.getElementById('status');
const squares = Array.from(document.getElementsByClassName('square'));
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    const winner = checkWin();
    if (winner) {
        status.textContent = ${winner} Wins!;
        gameActive = false;
    } else if (!gameBoard.includes(null)) {
        status.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = Player ${currentPlayer}'s Turn;
    }
}

function resetGame() {
    gameBoard.fill(null);
    squares.forEach(square => square.textContent = '');
    currentPlayer = 'X';
    status.textContent = "Player X's Turn";
    gameActive = true;
}

board.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetGame);
