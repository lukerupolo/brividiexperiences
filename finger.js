let currentPromptIndex = 0;
let currentPlayer = 1;
let totalPlayers = 0;
let playerScores = [];

const prompts = [
    "Put a finger down if you have skydived.",
    "Put a finger down if you have eaten sushi.",
    "Put a finger down if you have traveled outside your country.",
    "Put a finger down if you have been to a concert.",
    "Put a finger down if you have a pet."
];

function startGame(players) {
    totalPlayers = players;
    playerScores = new Array(players).fill(0);  // Initialize scores to zero for all players
    document.getElementById("setup-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    displayPrompt();
}

function displayPrompt() {
    document.getElementById("prompt").textContent = prompts[currentPromptIndex];
    document.getElementById("current-player").textContent = currentPlayer;
}

function nextPlayer() {
    if (currentPlayer < totalPlayers) {
        currentPlayer++;
    } else {
        currentPlayer = 1;
        currentPromptIndex++;
        
        if (currentPromptIndex >= prompts.length) {
            displayLeaderboard();
            return;
        }
    }
    displayPrompt();
}

function putFingerDown() {
    playerScores[currentPlayer - 1]++;
    nextPlayer();
}

function displayLeaderboard() {
    document.getElementById("game-screen").style.display = "none";
    const leaderboardScreen = document.getElementById("leaderboard-screen");
    leaderboardScreen.style.display = "block";

    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = '';
    playerScores.forEach((score, index) => {
        leaderboard.innerHTML += `<p>Player ${index + 1}: ${score} fingers down</p>`;
    });
}

function restartGame() {
    currentPromptIndex = 0;
    currentPlayer = 1;
    startGame(totalPlayers);
}
