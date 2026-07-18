// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.5
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

const workedHoursDisplay = document.getElementById("workedHours");
const freeTimeDisplay = document.getElementById("freeTime");

// ===========================
// STATISTICS ELEMENTS
// ===========================

const statsTotalHours =
    document.getElementById("statsTotalHours");

const statsTasksCompleted =
    document.getElementById("statsTasksCompleted");

const statsFavoriteTask =
    document.getElementById("statsFavoriteTask");

// ===========================
// UPDATE LEVEL UI
// ===========================

function updateLevelUI() {

    levelDisplay.textContent =
        "⭐ Level " + game.level;

    totalXPDisplay.textContent =
        Math.floor(game.currentXP) +
        " / " +
        XP_PER_LEVEL +
        " XP";

    xpFill.style.width =
        (game.currentXP / XP_PER_LEVEL) * 100 + "%";

}

// ===========================
// UPDATE STATISTICS UI
// ===========================

function updateStatisticsUI() {

    statsTotalHours.textContent =
        game.stats.totalHours.toFixed(2) + " Hours";

    statsTasksCompleted.textContent =
        game.stats.totalTasksCompleted;

    statsFavoriteTask.textContent =
        game.stats.favoriteTask || "None";

}

// ===========================
// UPDATE TASK UI
// ===========================

function updateTaskUI(taskName) {

    const task = game.tasks[taskName];

    taskTitle.textContent =
        taskName;

    taskXP.textContent =
        task.xp.toFixed(2) + " XP";

    taskHours.textContent =
        (task.seconds / 3600).toFixed(2) + " Hours";

    timerDisplay.textContent =
        formatTime(task.seconds);

    xpRateDisplay.textContent =
        xpRates[taskName] + " XP / Hour";

}

// ===========================
// UPDATE PRODUCTIVITY
// ===========================

function updateProductivity() {

    let totalSeconds = 0;

    for (const task in game.tasks) {

        totalSeconds += game.tasks[task].seconds;

    }

// ===========================================
// UPDATE STATISTICS DASHBOARD
// ===========================================

function updateStatisticsUI() {

    statsLifetimeXP.textContent =
        `${game.totalLifetimeXP.toFixed(0)} XP`;

    statsTotalHours.textContent =
        `${game.stats.totalHours.toFixed(1)} Hours`;

    statsTasksCompleted.textContent =
        game.stats.tasksCompleted;

    statsFavoriteTask.textContent =
        game.stats.favoriteTask;

    statsCurrentStreak.textContent =
        `${game.stats.currentStreak} Days`;

    statsDaysPlayed.textContent =
        game.stats.daysPlayed;

}

    const totalHours = totalSeconds / 3600;

    workedHoursDisplay.textContent =
        totalHours.toFixed(2) + " Hours";

    const freeHours =
        Math.max(0, 16 - totalHours);

    freeTimeDisplay.textContent =
        freeHours.toFixed(2) + " Hours";

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

// ===========================================
// REFRESH ENTIRE DASHBOARD
// ===========================================

function refreshDashboard() {

    updateLevelUI();

    updateProductivity();

    updateStatisticsUI();

}

// ===========================================
// END OF FILE
// ===========================================