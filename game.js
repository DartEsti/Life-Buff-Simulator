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

    lastPlayedDate: new Date().toDateString(),

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

    saveGame();

}

// ===========================
// LEVEL UP
// ===========================

function levelUp() {

    alert("🎉 LEVEL UP!\n\nWelcome to Level " + game.level + "!");

}

// ===========================
// DAILY RESET SYSTEM
// ===========================

function resetDailyTasks() {

    for (const taskName in game.tasks) {

        game.tasks[taskName].seconds = 0;

        game.tasks[taskName].xp = 0;

    }

    workedHoursDisplay.textContent = "0 Hours";

    freeTimeDisplay.textContent = "16 Hours";

    clockInDisplay.textContent = "--:--";

    clockOutDisplay.textContent = "--:--";

    isClockedIn = false;

    clockInBtn.disabled = false;

    clockOutBtn.disabled = true;

    pauseTask();

    saveGame();

}

function checkForNewDay() {

    const today = new Date().toDateString();

    if (today !== game.lastPlayedDate) {

        game.lastPlayedDate = today;

        resetDailyTasks();

        alert("🌅 Welcome to a new day!\n\nYour daily tasks have been refreshed.");

    }

}

// ===========================
// SAVE GAME
// ===========================

function saveGame() {

    localStorage.setItem(
        "lifeBuffSave",
        JSON.stringify(game)
    );

}

// ===========================
// LOAD GAME
// ===========================

function loadGame() {

    const savedGame = localStorage.getItem("lifeBuffSave");

    if (!savedGame) return;

    try {

        const loaded = JSON.parse(savedGame);

        Object.assign(game, loaded);

        updateLevelUI();

        updateProductivity();

        if (loaded.clockIn) {

            clockInDisplay.textContent = loaded.clockIn;

        }

        if (loaded.clockOut) {

            clockOutDisplay.textContent = loaded.clockOut;

        }

    }

    catch(error) {

        console.error("Save file corrupted.");

        localStorage.removeItem("lifeBuffSave");

    }

}
