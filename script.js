// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.3
// Part 1 - Game Foundation
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

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const closeBtn = document.querySelector(".close");

const cards = document.querySelectorAll(".task-card");

const levelDisplay = document.getElementById("levelDisplay");
const totalXPDisplay = document.getElementById("totalXP");
const xpFill = document.getElementById("xpFill");

// ===========================
// SESSION ELEMENTS
// ===========================

const clockInDisplay = document.getElementById("clockIn");
const clockOutDisplay = document.getElementById("clockOut");

const clockInBtn = document.getElementById("clockInBtn");
const clockOutBtn = document.getElementById("clockOutBtn");

// ===========================
// GAME SETTINGS
// ===========================

const MAX_LEVEL = 150;
const XP_PER_LEVEL = 1000;

// XP gained every hour

const xpRates = {

    "Household Maintenance": 15,

    "Exercise": 10,

    "Study": 25,

    "Work": 40,

    "Personal Care": 10

};

// ===========================
// GAME DATA
// ===========================

const game = {

    level: 1,

    currentXP: 0,

    totalLifetimeXP: 0,

    maxXP: XP_PER_LEVEL,

    activeTask: null,

    timer: null,

    tasks: {

        "Household Maintenance": {

            seconds: 0,

            xp: 0

        },

        "Exercise": {

            seconds: 0,

            xp: 0

        },

        "Study": {

            seconds: 0,

            xp: 0

        },

        "Work": {

            seconds: 0,

            xp: 0

        },

        "Personal Care": {

            seconds: 0,

            xp: 0

        }

    }

};

// ===========================
// CURRENTLY OPEN TASK
// ===========================

let currentTask = null;

// ===========================
// LEVEL SYSTEM
// ===========================

function addXP(amount) {

    game.currentXP += amount;

    game.totalLifetimeXP += amount;

    while (game.currentXP >= XP_PER_LEVEL && game.level < MAX_LEVEL) {

        game.currentXP -= XP_PER_LEVEL;

        game.level++;

        levelUp();

    }

    if (game.level >= MAX_LEVEL) {

        game.level = MAX_LEVEL;

        game.currentXP = Math.min(game.currentXP, XP_PER_LEVEL);

    }

    updateLevelUI();

}

// ===========================
// LEVEL UP
// ===========================

function levelUp() {

    alert("🎉 LEVEL UP!\n\nWelcome to Level " + game.level + "!");

}

// ===========================
// UPDATE XP BAR
// ===========================

function updateLevelUI() {

    levelDisplay.textContent = "⭐ Level " + game.level;

    totalXPDisplay.textContent =
        Math.floor(game.currentXP) + " / " + XP_PER_LEVEL + " XP";

    xpFill.style.width =
        (game.currentXP / XP_PER_LEVEL) * 100 + "%";

}

// ===========================
// FORMAT TIME
// ===========================

function formatTime(totalSeconds) {

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

// ===========================================
// END OF PART 1
// Continue with Part 2
// ===========================================

// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.3
// Part 2 - Task System & Timer
// ===========================================

// ===========================
// OPEN TASK
// ===========================

function openTask(taskName) {

    currentTask = taskName;

    const task = game.tasks[currentTask];

    taskTitle.textContent = currentTask;

    taskXP.textContent =
        task.xp.toFixed(2) + " XP";

    taskHours.textContent =
        (task.seconds / 3600).toFixed(2) + " Hours";

    timerDisplay.textContent =
        formatTime(task.seconds);

    xpRateDisplay.textContent =
        xpRates[currentTask] + " XP / Hour";

    modal.style.display = "flex";

}

// ===========================
// REFRESH POPUP
// ===========================

function refreshCurrentTask() {

    if (currentTask === null) return;

    const task = game.tasks[currentTask];

    taskXP.textContent =
        task.xp.toFixed(2) + " XP";

    taskHours.textContent =
        (task.seconds / 3600).toFixed(2) + " Hours";

    timerDisplay.textContent =
        formatTime(task.seconds);

}

// ===========================
// START TIMER
// ===========================

function startTask() {

    if (!isClockedIn) {

        alert("🕒 Please Clock In before starting a task.");

        return;

    }

    if (currentTask === null) return;

    // Pause previous timer

    if (game.timer !== null) {

        clearInterval(game.timer);

        game.timer = null;

    }

    game.activeTask = currentTask;

    game.timer = setInterval(() => {

    const task = game.tasks[game.activeTask];

    task.seconds++;

    const gainedXP = xpRates[game.activeTask] / 3600;

    task.xp += gainedXP;

    addXP(gainedXP);

    if (currentTask === game.activeTask) {

        refreshCurrentTask();

    }

    // Update the dashboard every second
    updateProductivity();

}, 1000);

}

// ===========================
// PAUSE TIMER
// ===========================

function pauseTask() {

    if (game.timer !== null) {

        clearInterval(game.timer);

        game.timer = null;

    }

    game.activeTask = null;

    updateProductivity();

}

// ===========================
// CLOSE MODAL
// ===========================

function closeModal() {

    modal.style.display = "none";

}

// ===========================
// TASK CARD EVENTS
// ===========================

cards.forEach(card => {

    card.addEventListener("click", () => {

        openTask(card.dataset.task);

    });

});

// ===========================================
// END OF PART 2
// Continue with Part 3
// ===========================================

// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.3
// Part 3 - Events & Initialization
// ===========================================

// ===========================
// BUTTON EVENTS
// ===========================

startBtn.addEventListener("click", () => {

    startTask();

});

pauseBtn.addEventListener("click", () => {

    pauseTask();

});

closeBtn.addEventListener("click", () => {

    closeModal();

});

// ===========================
// CLOSE MODAL WHEN CLICKING
// OUTSIDE OF IT
// ===========================

window.addEventListener("click", (event) => {

    if (event.target === modal) {

        closeModal();

    }

});

// ===========================
// INITIALIZE UI
// ===========================

updateLevelUI();
// ===========================
// PLAYER SESSION
// ===========================
let isClockedIn = false;
console.log("Clock In System Loaded");
function getCurrentTime() {

    return new Date().toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}

clockInBtn.addEventListener("click", () => {

    isClockedIn = true;

    clockInDisplay.textContent = getCurrentTime();

    clockInBtn.disabled = true;

    clockOutBtn.disabled = false;

});

clockOutBtn.addEventListener("click", () => {

    isClockedIn = false;

    clockOutDisplay.textContent = getCurrentTime();

    clockOutBtn.disabled = true;

    clockInBtn.disabled = false;

    pauseTask();

    closeModal();

    updateProductivity();

});

// ===========================
// PRODUCTIVITY SYSTEM
// ===========================

const workedHoursDisplay = document.getElementById("workedHours");
const freeTimeDisplay = document.getElementById("freeTime");

function updateProductivity() {

    let totalSeconds = 0;

    for (const task in game.tasks) {

        totalSeconds += game.tasks[task].seconds;

    }

    const totalHours = totalSeconds / 3600;

    workedHoursDisplay.textContent =
        totalHours.toFixed(2) + " Hours";

    const freeHours = Math.max(0, 16 - totalHours);

    freeTimeDisplay.textContent =
        freeHours.toFixed(2) + " Hours";

}   

// ===========================
// FUTURE FEATURES
// (Coming in Version 0.4)
// ===========================

// Clock In
// Clock Out
// Daily Reset
// Daily Streak
// Calendar
// Local Storage
// Daily Summary

// ===========================================
// END OF FILE
// ===========================================