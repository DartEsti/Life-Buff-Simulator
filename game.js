// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.8
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

    level: 1,

    currentXP: 0,

     totalLifetimeXP: 0,

    // ===========================
    // PLAYER PROFILE
    // ===========================

    player: {

        name: "Player",

        title: "Beginner",

        avatar: "😀"

    },

    maxXP: XP_PER_LEVEL,

    activeTask: null,

    timer: null,

    lastResetDate: null,

    // =======================================
    // PLAYER STATISTICS
    // =======================================

    stats: {

        totalHours: 0,

        totalTasksCompleted: 0,

        favoriteTask: "None",

        currentStreak: 0,

        daysPlayed: 0,

        bestTaskHours: 0

    },

    // =======================================
    // TASK DATA
    // =======================================

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

// ===========================================
// CURRENT TASK
// ===========================================

let currentTask = null;

// ===========================================
// ADD XP
// ===========================================

function addXP(amount) {

    game.currentXP += amount;

    game.totalLifetimeXP += amount;

    showXPPopup(amount);

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

    saveGame();

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

    const hours = Math.floor(

        totalSeconds / 3600

    );

    const minutes = Math.floor(

        (totalSeconds % 3600) / 60

    );

    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

// ===========================================
// XP POPUP
// ===========================================

function showXPPopup(amount) {

    const popup = document.createElement("div");

    popup.className = "xp-popup";

    popup.textContent = `+${amount.toFixed(2)} XP`;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.remove();

    }, 1200);

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
// END OF FILE
// ===========================================