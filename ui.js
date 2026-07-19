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
// PLAYER PROFILE
// ===========================

const changeNameBtn =
    document.getElementById("changeNameBtn");
const profileXPFill =
    document.getElementById("profileXPFill");

const profileXPProgress =
    document.getElementById("profileXPProgress");

const playerAvatar =
    document.getElementById("playerAvatar");

const playerName =
    document.getElementById("playerName");

const playerTitle =
    document.getElementById("playerTitle");

const playerLevel =
    document.getElementById("playerLevel");

const playerXP =
    document.getElementById("playerXP");
 
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

        // Unlock avatars by level

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

    playerAvatar.textContent = game.player.avatar;

        playerName.textContent =
            game.player.name;

        playerTitle.textContent =
            game.player.title;

        playerLevel.textContent =
            `Level ${game.level}`;

        playerXP.textContent =
            `${Math.floor(game.totalLifetimeXP)} XP`;

        profileXPFill.style.width =
            `${(game.currentXP / XP_PER_LEVEL) * 100}%`;

        profileXPProgress.textContent =
            `${Math.floor(game.currentXP)} / ${XP_PER_LEVEL} XP`;

    function changePlayerName() {

    const newName = prompt(

        "Enter your new player name:",

        game.player.name

    );

    if (!newName) return;

    game.player.name = newName.trim();

    updatePlayerProfile();

    saveGame();

}

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

changeNameBtn.addEventListener("click", () => {

    changePlayerName();

});

// ===========================================
// END OF FILE
// ===========================================