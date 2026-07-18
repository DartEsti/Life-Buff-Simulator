// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.5
// game.js
// Core Game Logic
// ===========================================

// ===========================
// GAME SETTINGS
// ===========================

const MAX_LEVEL = 150;
const XP_PER_LEVEL = 1000;

// XP gained per hour

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

    // ===========================
    // LIFETIME STATISTICS
    // ===========================

stats: {

    totalHours: 0,

    tasksCompleted: 0,

    favoriteTask: "None",

    currentStreak: 0,

    daysPlayed: 0

},

    maxXP: XP_PER_LEVEL,

    activeTask: null,

    timer: null,

    lastResetDate: null,

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
// CURRENT TASK
// ===========================

let currentTask = null;

// ===========================
// ADD XP
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

    saveGame();

}

// ===========================
// LEVEL UP
// ===========================

function levelUp() {

    alert("🎉 LEVEL UP!\n\nWelcome to Level " + game.level + "!");

}

// ===========================
// DAILY RESET
// ===========================

function resetDailyTasks() {

    for (const task in game.tasks) {

        game.tasks[task].seconds = 0;

        game.tasks[task].xp = 0;

    }

    game.activeTask = null;

    if (typeof pauseTask === "function") {

        pauseTask();

    }

    if (typeof updateProductivity === "function") {

        updateProductivity();

    }

    game.lastResetDate = new Date().toDateString();

    saveGame();

}

// ===========================
// CHECK FOR NEW DAY
// ===========================

function checkForNewDay() {

    const today = new Date().toDateString();

    if (game.lastResetDate === null) {

        game.lastResetDate = today;

        saveGame();

        return;

    }

    if (today !== game.lastResetDate) {

        resetDailyTasks();
        
    }

}

// ===========================
// FORMAT TIME
// ===========================

function formatTime(totalSeconds) {

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

// ===========================================
// END OF FILE
// ===========================================