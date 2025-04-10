const board = document.querySelectorAll(".box");
const turnDisplay = document.getElementById("turn-indicator");
const xWins = document.getElementById("x-score");
const oWins = document.getElementById("o-score");
const draws = document.getElementById("draws");
const totalGames = document.getElementById("total-games");
const longestStreak = document.getElementById("streak");
const winnerBox = document.getElementById("winner-box");
const msg = document.getElementById("msg");

let currentPlayer = "X";
let winStreak = 0;
let maxStreak = 0;
let scores = { X: 0, O: 0, Draw: 0 };

// Show winner message
function showWinnerMessage(winnerName) {
  msg.textContent = `🎉 Congratulations ${winnerName}, you won the game! 🎉`;
  winnerBox.classList.remove("hide");

  // Auto-hide after 3 seconds
  setTimeout(() => {
    winnerBox.classList.add("hide");
  }, 3000);
}

// Update the turn indicator text
function updateTurnDisplay() {
  const nameX = document.getElementById("playerXName").value || "Player X";
  const nameO = document.getElementById("playerOName").value || "Player O";
  turnDisplay.textContent = currentPlayer === "X" ? `${nameX}'s Turn` : `${nameO}'s Turn`;
}

// Check for a winning pattern
function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.find(pattern => {
    const [a, b, c] = pattern;
    return board[a].textContent &&
           board[a].textContent === board[b].textContent &&
           board[a].textContent === board[c].textContent;
  });
}

// Update scoreboard stats
function updateStats(winner) {
  scores[winner]++;
  xWins.textContent = scores.X;
  oWins.textContent = scores.O;
  draws.textContent = scores.Draw;
  totalGames.textContent = scores.X + scores.O + scores.Draw;

  if (winner === currentPlayer) {
    winStreak++;
    maxStreak = Math.max(maxStreak, winStreak);
  } else {
    winStreak = 0;
  }
  longestStreak.textContent = maxStreak;
}

// Reset the board
function resetBoard() {
  board.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
  currentPlayer = "X";
  updateTurnDisplay();
}

// Handle each box click
function handleClick(e) {
  const cell = e.target;
  if (cell.textContent) return;

  cell.textContent = currentPlayer;

  const winnerPattern = checkWin();
  if (winnerPattern) {
    winnerPattern.forEach(i => board[i].classList.add("win"));
    updateStats(currentPlayer);

    const winnerName = currentPlayer === "X"
      ? document.getElementById("playerXName").value || "Player X"
      : document.getElementById("playerOName").value || "Player O";
    showWinnerMessage(winnerName);

    setTimeout(resetBoard, 1500);
    return;
  }

  if ([...board].every(cell => cell.textContent)) {
    updateStats("Draw");
    setTimeout(resetBoard, 1500);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnDisplay();
}

// Add event listeners to all cells
board.forEach(cell => cell.addEventListener("click", handleClick));

// Dark mode toggle
document.getElementById("dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Avatar upload preview
function handleAvatarUpload(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = "block";
    }
  });
}

handleAvatarUpload("avatarX", "avatarXPreview");
handleAvatarUpload("avatarO", "avatarOPreview");

// Update name display in turn indicator
document.getElementById("playerXName").addEventListener("input", updateTurnDisplay);
document.getElementById("playerOName").addEventListener("input", updateTurnDisplay);

// New Game button functionality
document.getElementById("new-btn").addEventListener("click", () => {
  winnerBox.classList.add("hide");
  resetBoard();
});

// Initial turn display
updateTurnDisplay();
