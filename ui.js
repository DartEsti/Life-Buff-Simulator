// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.8
// ui.js
// User Interface
// ===========================================

// ===========================
// DOM ELEMENTS
// ===========================

const modal = document.getElementById("taskModal");

const taskTitle = document.getElementById("taskTitle");
const taskXP = document.getElementById("taskXP");
const taskHours = document.getElementById("taskHours");
const timerDisplay = document.getElementById("timer");
const xpRateDisplay = document.getElementById("xpRate");

const levelDisplay = document.getElementById("levelDisplay");
const totalXPDisplay = document.getElementById("totalXP");
const xpFill = document.getElementById("xpFill");

const playerName =
    document.getElementById("playerName");

const playerRank =
    document.getElementById("playerRank");

const profileLevel =
    document.getElementById("profileLevel");

const profileXP =
    document.getElementById("profileXP");

const workedHoursDisplay =
    document.getElementById("workedHours");

const freeTimeDisplay =
    document.getElementById("freeTime");

// ===========================
// STATISTICS DASHBOARD
// ===========================

const statsLifetimeXP =
    document.getElementById("statsLifetimeXP");

const statsTotalHours =
    document.getElementById("statsTotalHours");

const statsTasksCompleted =
    document.getElementById("statsTasksCompleted");

const statsFavoriteTask =
    document.getElementById("statsFavoriteTask");

const statsCurrentStreak =
    document.getElementById("statsCurrentStreak");

const statsDaysPlayed =
    document.getElementById("statsDaysPlayed");
 
// ===========================
// UPDATE LEVEL UI
// ===========================

function updateLevelUI() {

    levelDisplay.textContent =
        `⭐ Level ${game.level}`;

    totalXPDisplay.textContent =
        `${Math.floor(game.currentXP)} / ${XP_PER_LEVEL} XP`;

    xpFill.style.width =
        `${(game.currentXP / XP_PER_LEVEL) * 100}%`;

}

// ===========================
// UPDATE TASK UI
// ===========================

function updateTaskUI(taskName) {

    const task = game.tasks[taskName];

    taskTitle.textContent =
        taskName;

    taskXP.textContent =
        `${task.xp.toFixed(2)} XP`;

    taskHours.textContent =
        `${(task.seconds / 3600).toFixed(2)} Hours`;

    timerDisplay.textContent =
        formatTime(task.seconds);

    xpRateDisplay.textContent =
        `${xpRates[taskName]} XP / Hour`;

}

// ===========================
// UPDATE PRODUCTIVITY
// ===========================

function updateProductivity() {

    let totalSeconds = 0;

    for (const task in game.tasks) {

        totalSeconds +=
            game.tasks[task].seconds;

    }

    const totalHours =
        totalSeconds / 3600;

    workedHoursDisplay.textContent =
        `${totalHours.toFixed(2)} Hours`;

    const freeHours =
        Math.max(0, 16 - totalHours);

    freeTimeDisplay.textContent =
        `${freeHours.toFixed(2)} Hours`;

}

// ===========================
// UPDATE STATISTICS UI
// ===========================

function updateStatisticsUI() {

    statsLifetimeXP.textContent =
        `${(game.totalLifetimeXP ?? 0).toFixed(0)} XP`;

    statsTotalHours.textContent =
        `${(game.stats.totalHours ?? 0).toFixed(2)} Hours`;

    statsTasksCompleted.textContent =
        game.stats.totalTasksCompleted ?? 0;

    statsFavoriteTask.textContent =
        game.stats.favoriteTask ?? "None";

    statsCurrentStreak.textContent =
        `${game.stats.currentStreak ?? 0} Days`;

    statsDaysPlayed.textContent =
        game.stats.daysPlayed ?? 0;

}

 // ===========================
// UPDATE PLAYER PROFILE
// ===========================

function updatePlayerProfile() {

    // Player Name
    playerName.textContent = "Player";

    // Player Rank

    let rank = "Beginner";

    if (game.level >= 10)
        rank = "Adventurer";

    if (game.level >= 25)
        rank = "Veteran";

    if (game.level >= 50)
        rank = "Elite";

    if (game.level >= 100)
        rank = "Legend";

    playerRank.textContent = rank;

    // Current Level

    profileLevel.textContent =
        `Level ${game.level}`;

    // Lifetime XP

    profileXP.textContent =
        `${Math.floor(game.totalLifetimeXP)} XP`;

}

// ===========================
// OPEN MODAL
// ===========================

function showTaskModal() {

    modal.style.display = "flex";

}

// ===========================
// CLOSE MODAL
// ===========================

function hideTaskModal() {

    modal.style.display = "none";

}

// ===========================
// REFRESH CURRENT TASK
// ===========================

function refreshCurrentTask() {

    if (currentTask === null) return;

    updateTaskUI(currentTask);

}

// ===========================
// REFRESH DASHBOARD
// ===========================

function refreshDashboard() {

    updateLevelUI();

    updateProductivity();

    updateStatisticsUI();

    updatePlayerProfile();

}

// ===========================================
// END OF FILE
// ===========================================