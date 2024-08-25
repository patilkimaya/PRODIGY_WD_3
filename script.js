const gameMode = document.getElementById('gameMode');
const board = document.querySelector('.board');
let cells = [];
let currentPlayer = 'X';
let gameActive = false;

// Function to create the game board
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}


// Function to reset the game board
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    gameActive = true;
}


// Event listener for game mode selection
gameMode.addEventListener('change', (e) => {
    resetBoard(); // Reset the board when the game mode is changed
    board.style.display = 'grid'; // Show the game board
    if (e.target.value === 'single') {
        currentPlayer = 'X'; // User starts as 'X'
    } else {
        currentPlayer = 'X'; // User starts as 'X'
    }
});

// Function to check for win or tie
function checkWinOrTie() {
    const result = checkWin(currentPlayer);
    if (result) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
        resetBoard(); // Reset the board when the game ends
    } else if (cells.every(cell => cell.textContent !== '')) {
        alert("Game tie! No one wins.");
        gameActive = false;
        resetBoard(); // Reset the board when the game ends
    }
}

// Function to handle cell click
function handleCellClick(e) {
    const cell = e.target;
    if (!cell.classList.contains('cell') || !gameActive) return;

    // Place 'X' or 'O' only if it's the user's turn
    if (gameMode.value === 'single' && currentPlayer === 'O') return;

    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer;

    // Check for win or tie
    checkWinOrTie();

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // In single-player mode, let the AI make the next move
    if (gameMode.value === 'single' && currentPlayer === 'O') {
        // Ensure AI's move is made only after the user's move
        setTimeout(singlePlayerAI, 0);
    }
}


// Function to check for win
function checkWin(player) {
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

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
            return true;
        }
    }
    return false;
}

// Single player AI logic
function singlePlayerAI() {
    let bestScore = -Infinity;
    let move = null;

    // Iterate over all cells to find the best move for the AI
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            // Temporarily set the cell to 'O' for the AI's move
            cells[i].textContent = 'O';
            // Use the minimax function to evaluate the score of this move
            let score = minimax(cells, 0, false);
            // Reset the cell to an empty state for the next iteration
            cells[i].textContent = '';

            // Update the best score and move if this move is better
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    // If a move was found, make the AI's move
    if (move !== null) {
        cells[move].textContent = 'O';
        // Check for win or tie after the AI's move
        checkWinOrTie();
        // Switch back to 'X' for the next user move only if the game is still active
        if (gameActive) {
            currentPlayer = 'X';
        }
    }
}




// Minimax function for AI decision-making
function minimax(cells, depth, isMaximizing) {
    const scores = {
        'X': -10, // Increase the penalty if the user wins
        'O': 10,  // Increase the reward if the AI wins
        'tie': 0
    };

    // Check for win or tie
    let result = checkWin('X');
    if (result) return scores['X']; // If 'X' wins, 'O' (AI) loses

    result = checkWin('O');
    if (result) return scores['O']; // If 'O' wins, 'X' (user) loses

    if (cells.every(cell => cell.textContent !== '')) return scores['tie']; // If it's a tie

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = 'O'; // AI plays as 'O'
                let score = minimax(cells, depth + 1, false);
                cells[i].textContent = ''; // Reset cell for next iteration
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = 'X'; // User plays as 'X'
                let score = minimax(cells, depth + 1, true);
                cells[i].textContent = ''; // Reset cell for next iteration
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}



// Create the game board
createBoard();
