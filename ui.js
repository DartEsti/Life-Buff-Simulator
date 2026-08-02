// ===========================================
// LIFE BUFF SIMULATOR
// Version 2.0
// ui.js
// User Interface
// ===========================================

// ===========================================
// DOM ELEMENTS
// ===========================================

// ---------- Task Modal ----------

const modal =
    document.getElementById("taskModal");

const taskTitle =
    document.getElementById("taskTitle");

const taskXP =
    document.getElementById("taskXP");

const taskHours =
    document.getElementById("taskHours");

const timerDisplay =
    document.getElementById("timer");

const xpRateDisplay =
    document.getElementById("xpRate");

// ---------- Dashboard ----------

const levelDisplay =
    document.getElementById("levelDisplay");

const totalXPDisplay =
    document.getElementById("totalXP");

const xpFill =
    document.getElementById("xpFill");

const workedHoursDisplay =
    document.getElementById("workedHours");

const freeTimeDisplay =
    document.getElementById("freeTime");

// ---------- Statistics ----------

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

// ---------- Player Profile ----------

const changeNameBtn =
    document.getElementById("changeNameBtn");

const playerAvatar =
    document.getElementById("playerAvatar");

const playerName =
    document.getElementById("playerName");

const playerRank =
    document.getElementById("playerRank");

const profileLevel =
    document.getElementById("profileLevel");

const profileXP =
    document.getElementById("profileXP");

const profileXPFill =
    document.getElementById("profileXPFill");

const profileXPProgress =
    document.getElementById("profileXPProgress");

// ===========================================
// UPDATE LEVEL UI
// ===========================================

function updateLevelUI() {

    levelDisplay.textContent =
        `⭐ Level ${game.level}`;

    totalXPDisplay.textContent =
        `${Math.floor(game.currentXP)} / ${XP_PER_LEVEL} XP`;

    xpFill.style.width =
         `${(game.currentXP / XP_PER_LEVEL) * 100}%`;

}

// ===========================================
// UPDATE TASK UI
// ===========================================

 function updateTaskUI(taskName) {

    const task = game.tasks[taskName];

    if (!task) return;

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

// ===========================================
// UPDATE PRODUCTIVITY
// ===========================================

function updateProductivity() {

    let totalSeconds = 0;

    for (const taskName in game.tasks) {

        totalSeconds +=
            game.tasks[taskName].seconds;

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

// ===========================================
// UPDATE STATISTICS UI
// ===========================================

function updateStatisticsUI() {

    statsLifetimeXP.textContent =
        `${Math.floor(game.totalLifetimeXP)} XP`;

    statsTotalHours.textContent =
        `${game.stats.totalHours.toFixed(2)} Hours`;

    statsTasksCompleted.textContent =
        game.stats.totalTasksCompleted;

    statsFavoriteTask.textContent =
        game.stats.favoriteTask;

    statsCurrentStreak.textContent =
        `${game.stats.currentStreak} Days`;

    statsDaysPlayed.textContent =
        game.stats.daysPlayed;

}

// ===========================================
// UPDATE PLAYER PROFILE
// ===========================================

function updatePlayerProfile() {

    let rank = "Beginner";

    if (game.level >= 5)
        rank = "Novice";

    if (game.level >= 10)
        rank = "Adventurer";

    if (game.level >= 20)
        rank = "Explorer";

    if (game.level >= 30)
        rank = "Veteran";

    if (game.level >= 50)
        rank = "Elite";

    if (game.level >= 75)
        rank = "Master";

    if (game.level >= 100)
        rank = "Legend";

    if (game.level >= 125)
        rank = "Mythic";

    if (game.level >= 150)
        rank = "Life Buff God";

    game.player.title = rank;

    // =======================================
    // AVATAR UNLOCKS
    // =======================================

    if (game.level >= 150)
        game.player.avatar = "👑";

    else if (game.level >= 100)
        game.player.avatar = "🐉";

    else if (game.level >= 75)
        game.player.avatar = "🧙";

    else if (game.level >= 50)
        game.player.avatar = "⚔️";

    else if (game.level >= 30)
        game.player.avatar = "🛡️";

    else if (game.level >= 20)
        game.player.avatar = "🏹";

    else if (game.level >= 10)
        game.player.avatar = "🧑‍🚀";

    else if (game.level >= 5)
        game.player.avatar = "😎";

    else
        game.player.avatar = "😀";

    // =======================================
    // UPDATE PROFILE
    // =======================================

    if (playerAvatar)
        playerAvatar.textContent =
            game.player.avatar;

    if (playerName)
        playerName.textContent =
            game.player.name;

    if (playerRank)
        playerRank.textContent =
            game.player.title;

    if (profileLevel)
        profileLevel.textContent =
            `Level ${game.level}`;

    if (profileXP)
        profileXP.textContent =
            `${Math.floor(game.totalLifetimeXP)} XP`;

    if (profileXPFill)
        profileXPFill.style.width =
            `${(game.currentXP / XP_PER_LEVEL) * 100}%`;

    if (profileXPProgress)
        profileXPProgress.textContent =
            `${Math.floor(game.currentXP)} / ${XP_PER_LEVEL} XP`;

}

// ===========================================
// CHANGE PLAYER NAME
// ===========================================

function changePlayerName() {

    const newName = prompt(

        "Enter your new player name:",

        game.player.name

    );

    if (!newName) return;

    const trimmedName = newName.trim();

    if (trimmedName.length === 0) return;

    game.player.name = trimmedName;

    updatePlayerProfile();

    saveGame();

} 

// ===========================================
// OPEN MODAL
// ===========================================

function showTaskModal() {

    modal.style.display = "flex";

}

// ===========================================
// CLOSE MODAL
// ===========================================

function hideTaskModal() {

    modal.style.display = "none";

}

// ===========================================
// REFRESH CURRENT TASK
// ===========================================

function refreshCurrentTask() {

    if (currentTask === null) return;

    updateTaskUI(currentTask);

}

// ===========================================
// REFRESH DASHBOARD
// ===========================================

function refreshDashboard() {

    updateLevelUI();

    updateProductivity();

    updateStatisticsUI();

    updatePlayerProfile();

    refreshCurrentTask();

    updateAchievementCounter();

}

// ===========================================
// LIVE UI REFRESH
// ===========================================

// Updates the currently opened task every second.
// This DOES NOT control the timers.
// It only refreshes the displayed values.

setInterval(() => {

    refreshCurrentTask();

}, 1000);

// Refresh dashboard every second so XP,
// productivity and statistics stay updated.

setInterval(() => {

    refreshDashboard();

}, 1000);

// ===========================================
// BUTTON EVENTS
// ===========================================

if (changeNameBtn) {

    changeNameBtn.addEventListener("click", () => {

        changePlayerName();

    });

}

// ===========================================
// INITIALIZE USER INTERFACE
// ===========================================

function initializeUI() {

    updateLevelUI();

    updateProductivity();

    updateStatisticsUI();

    updatePlayerProfile();

    refreshCurrentTask();

}

// ===========================================
// LIVE TASK DISPLAY
// ===========================================

// Only refresh the currently opened task modal.
// Running task timers already refresh the dashboard.

setInterval(() => {

    refreshCurrentTask();

}, 1000);

// ===========================================
// BUTTON EVENTS
// ===========================================

if (changeNameBtn) {

    changeNameBtn.addEventListener(

        "click",

        changePlayerName

    );

}

// ===========================================
// WINDOW EVENTS
// ===========================================

// Close modal when clicking outside it

window.addEventListener("click", (event) => {

    if (event.target === modal) {

        hideTaskModal();

    }

});

// ===========================================
// STARTUP
// ===========================================

// Build the UI after everything has loaded.

initializeUI();

// ===========================================
// END OF FILE
// ===========================================