// ===========================================
// LIFE BUFF SIMULATOR
// Version 1.0 Stable
// game.js
// Core Game Logic
// ===========================================

// ===========================================
// GAME SETTINGS
// ===========================================

const MAX_LEVEL = 150;

const XP_PER_LEVEL = 1000;

// ===========================================
// XP RATES
// ===========================================

const xpRates = {

    "Household Maintenance": 15,

    "Exercise": 10,

    "Study": 25,

    "Work": 40,

    "Personal Care": 10

};

// ===========================================
// GAME DATA
// ===========================================

const game = {

    // ===========================
    // PLAYER PROGRESSION
    // ===========================

    level: 1,

    currentXP: 0,

    totalLifetimeXP: 0,

    maxXP: XP_PER_LEVEL,

    lastResetDate: null,

    // ===========================
    // PLAYER PROFILE
    // ===========================

    player: {

        name: "Player",

        title: "Beginner",

        avatar: "😀"

    },

    // ===========================
    // LIFETIME STATISTICS
    // ===========================

    stats: {

        totalHours: 0,

        totalTasksCompleted: 0,

        favoriteTask: "None",

        currentStreak: 0,

        daysPlayed: 0,

        bestTaskHours: 0

    },

    // ===========================
    // TASK DATA
    // ===========================

// =======================================
// TASK DATA
// =======================================

    tasks: {

        "Household Maintenance": {

            seconds: 0,

            xp: 0,

            timer: null,

            isRunning: false,

            completedToday: false

        },

        "Exercise": {

            seconds: 0,

            xp: 0,

            timer: null,

            isRunning: false,

            completedToday: false

        },

        "Study": {

            seconds: 0,

            xp: 0,

            timer: null,

            isRunning: false,

            completedToday: false

        },

        "Work": {

            seconds: 0,

            xp: 0,

            timer: null,

            isRunning: false,

            completedToday: false

        },

        "Personal Care": {

            seconds: 0,

            xp: 0,

            timer: null,

            isRunning: false,

            completedToday: false

        }

    }

};

// ===========================================
// CURRENTLY OPEN TASK
// ===========================================

let currentTask = null;

// ===========================================
// TASK TEMPLATE
// ===========================================

function createTask() {

    return {

        seconds: 0,

        xp: 0,

        timer: null,

        isRunning: false,

        completedToday: false

    };

}

// ===========================================
// ADD XP
// ===========================================

function addXP(amount) {

    game.currentXP += amount;

    game.totalLifetimeXP += amount;

    while (

        game.currentXP >= XP_PER_LEVEL &&

        game.level < MAX_LEVEL

    ) {

        game.currentXP -= XP_PER_LEVEL;

        game.level++;

        levelUp();

    }

    if (game.level >= MAX_LEVEL) {

        game.level = MAX_LEVEL;

        game.currentXP = Math.min(

            game.currentXP,

            XP_PER_LEVEL

        );

    }

    refreshDashboard();

}

// ===========================================
// LEVEL UP
// ===========================================

function levelUp() {

    showLevelUpAnimation();

}

// ===========================================
// FORMAT TIME
// ===========================================

function formatTime(totalSeconds) {

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor(

        (totalSeconds % 3600) / 60

    );

    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

// ===========================================
// GET TOTAL PRODUCTIVE SECONDS
// ===========================================

function getTotalProductiveSeconds() {

    let total = 0;

    for (const taskName in game.tasks) {

        total += game.tasks[taskName].seconds;

    }

    return total;

}

// ===========================================
// GET TOTAL PRODUCTIVE HOURS
// ===========================================

function getTotalProductiveHours() {

    return getTotalProductiveSeconds() / 3600;

}

// ===========================================
// FIND FAVORITE TASK
// ===========================================

function updateFavoriteTask() {

    let highestSeconds = 0;

    let favorite = "None";

    for (const taskName in game.tasks) {

        if (game.tasks[taskName].seconds > highestSeconds) {

            highestSeconds = game.tasks[taskName].seconds;

            favorite = taskName;

        }

    }

    game.stats.favoriteTask = favorite;

    game.stats.bestTaskHours = highestSeconds / 3600;

}

// ===========================================
// XP POPUP
// ===========================================

function showXPPopup() {

    return;

}

// ===========================================
// LEVEL UP ANIMATION
// ===========================================

function showLevelUpAnimation() {

    const overlay = document.createElement("div");

    overlay.className = "level-up";

    overlay.textContent = `🎉 LEVEL ${game.level}!`;

    document.body.appendChild(overlay);

    setTimeout(() => {

        overlay.remove();

    }, 2000);

}

// ===========================================
// RESET ALL TASK TIMERS
// ===========================================

function stopAllTaskTimers() {

    for (const taskName in game.tasks) {

        const task = game.tasks[taskName];

        if (task.timer !== null) {

            clearInterval(task.timer);

            task.timer = null;

        }

        task.isRunning = false;

    }

}

// ===========================================
// RESET DAILY TASK DATA
// ===========================================

function resetTaskProgress() {

    stopAllTaskTimers();

    for (const taskName in game.tasks) {

        game.tasks[taskName] = createTask();

    }

    currentTask = null;

}

// ===========================================
// CHECK IF ANY TASK IS RUNNING
// ===========================================

function isAnyTaskRunning() {

    for (const taskName in game.tasks) {

        if (game.tasks[taskName].isRunning) {

            return true;

        }

    }

    return false;

}

// ===========================================
// GET RUNNING TASKS
// ===========================================

function getRunningTasks() {

    return Object.keys(game.tasks).filter(

        taskName => game.tasks[taskName].isRunning

    );

}

// ===========================================
// SAVE DASHBOARD
// ===========================================

function updateGameState() {

    updateFavoriteTask();

    refreshDashboard();

    saveGame();

}

// ===========================================
// END OF FILE
// ===========================================