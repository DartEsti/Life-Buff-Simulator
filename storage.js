// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.5
// storage.js
// Save System
// ===========================================

// ===========================================
// LOCAL STORAGE KEYS
// ===========================================

const STORAGE_KEYS = {

    SAVE: "lifeBuffSave",

    STATISTICS: "lifeBuffStatistics",

    DAILY_SUMMARIES: "dailySummaries",

    CALENDAR: "calendarData",

    LAST_PLAYED: "lastPlayedDate"

};

// ===========================
// SAVE GAME
// ===========================

function saveGame() {

    const saveData = {

        level: game.level,

        currentXP: game.currentXP,

        totalLifetimeXP: game.totalLifetimeXP,

        maxXP: game.maxXP,

        lastResetDate: game.lastResetDate,

        activeTask: game.activeTask,

        tasks: game.tasks,

        isClockedIn: isClockedIn,

        clockInTime: clockInDisplay.textContent,

        clockOutTime: clockOutDisplay.textContent

    };

    localStorage.setItem(
        "lifeBuffSave",
        JSON.stringify(saveData)
    );

}

// ===========================
// LOAD GAME
// ===========================

function loadGame() {

    const savedData = localStorage.getItem("lifeBuffSave");

    if (!savedData) {

        console.log("No save data found.");

        return;

    }

    try {

        const data = JSON.parse(savedData);

        game.level = data.level ?? 1;
        game.currentXP = data.currentXP ?? 0;
        game.totalLifetimeXP = data.totalLifetimeXP ?? 0;
        game.maxXP = data.maxXP ?? XP_PER_LEVEL;
        game.lastResetDate = data.lastResetDate ?? null;
        game.activeTask = data.activeTask ?? null;
        game.tasks = data.tasks ?? game.tasks;

        isClockedIn = data.isClockedIn ?? false;

        clockInDisplay.textContent =
            data.clockInTime ?? "--:--";

        clockOutDisplay.textContent =
            data.clockOutTime ?? "--:--";

        if (isClockedIn) {

            clockInBtn.disabled = true;
            clockOutBtn.disabled = false;

        } else {

            clockInBtn.disabled = false;
            clockOutBtn.disabled = true;

        }

        updateLevelUI();
        updateProductivity();

        console.log("Game Loaded Successfully.");

    }

    catch (error) {

        console.error("Corrupted save file.");

        localStorage.removeItem("lifeBuffSave");

    }

}

// ===========================================
// SAVE PLAYER STATISTICS
// ===========================================

function saveStatistics() {

    localStorage.setItem(
        "lifeBuffStatistics",
        JSON.stringify(game.stats)
    );

}

function loadStatistics() {

    const savedStats =
        localStorage.getItem("lifeBuffStatistics");

    if (savedStats) {

        game.stats = JSON.parse(savedStats);

    }

}

// ===========================================
// DAILY SUMMARY
// ===========================================

function buildDailySummary() {

    let totalHours = 0;
    let totalXP = 0;

    const tasks = {};

    for (const taskName in game.tasks) {

        const task = game.tasks[taskName];

        const hours = task.seconds / 3600;

        tasks[taskName] = {

            hours: Number(hours.toFixed(2)),
            xp: Number(task.xp.toFixed(2))

        };

        totalHours += hours;
        totalXP += task.xp;

    }

    return {

        date: getTodayDate(),

        totalHours: Number(totalHours.toFixed(2)),

        totalXP: Number(totalXP.toFixed(2)),

        tasks: tasks

    };

}

// ===========================================
// SAVE DAILY SUMMARY
// ===========================================

function saveDailySummary() {

    const summary = buildDailySummary();

    let summaries = JSON.parse(
        localStorage.getItem("dailySummaries")
    ) || {};

    summaries[summary.date] = summary;

    localStorage.setItem(
        "dailySummaries",
        JSON.stringify(summaries)
    );

}

// ===========================================
// LOAD DAILY SUMMARIES
// ===========================================

function loadDailySummaries() {

    return JSON.parse(
        localStorage.getItem("dailySummaries")
    ) || {};

}

// ===========================================
// GET DAILY SUMMARY
// ===========================================

function getDailySummary(date) {

    const summaries = loadDailySummaries();

    return summaries[date] || null;

}

// ===========================
// DELETE SAVE
// ===========================

function clearSave() {

    const confirmDelete = confirm(

        "Delete ALL saved progress?\n\nThis cannot be undone."

    );

    if (!confirmDelete) return;

    // Main save
    localStorage.removeItem("lifeBuffSave");

    // Statistics
    localStorage.removeItem("lifeBuffStatistics");

    // Daily summaries
    localStorage.removeItem("dailySummaries");

    // Calendar progress
    localStorage.removeItem("calendarData");

    // Last played date
    localStorage.removeItem("lastPlayedDate");

    console.log("🗑 All saved data deleted.");

    location.reload();

}

// ===========================
// AUTO SAVE
// ===========================

setInterval(() => {

    saveGame();

}, 30000);

// ===========================================
// DAILY RESET MANAGER
// ===========================================

function getTodayDate() {

    const today = new Date();

    return today.toISOString().split("T")[0];

}

function getLastPlayedDate() {

    return localStorage.getItem("lastPlayedDate");

}

function saveLastPlayedDate() {

    localStorage.setItem("lastPlayedDate", getTodayDate());

}

// ===========================================
// RESET DAILY DATA
// ===========================================

function resetDailyData() {

        pauseTask();

    let totalSeconds = 0;

    for (const task in game.tasks) {

        totalSeconds += game.tasks[task].seconds;

    }

    if (totalSeconds > 0) {

        saveDayStatus("completed");

    } else {

        saveDayStatus("missed");

    }

    saveDailySummary();

    // Now reset everything

    for (const task in game.tasks) {

        game.tasks[task].seconds = 0;
        game.tasks[task].xp = 0;

    }

    isClockedIn = false;

    clockInDisplay.textContent = "--:--";
    clockOutDisplay.textContent = "--:--";

    clockInBtn.disabled = false;
    clockOutBtn.disabled = true;

    updateProductivity();
    updateLevelUI();

    console.log("✅ Daily progress has been reset.");

}

// ===========================================
// DAILY CALENDAR STATUS
// ===========================================

function saveDayStatus(status) {

    const today = getTodayDate();

    let calendarData =
        JSON.parse(localStorage.getItem("calendarData")) || {};

    calendarData[today] = status;

    localStorage.setItem(
        "calendarData",
        JSON.stringify(calendarData)
    );

}

function getCalendarData() {

    return JSON.parse(
        localStorage.getItem("calendarData")
    ) || {};

}   

// ===========================================
// CHECK FOR NEW DAY
// ===========================================

function checkForNewDay() {

    const lastPlayed = getLastPlayedDate();
    const today = getTodayDate();

    // First time opening the website
if (lastPlayed === null) {

    game.stats.daysPlayed = 1;

    game.stats.currentStreak = 1;

    updateStatisticsUI();

    saveStatistics();

    saveLastPlayedDate();

    return;

}

    // A new day has started
if (lastPlayed !== today) {

    console.log("🌅 New day detected!");

    game.stats.daysPlayed++;

    game.stats.currentStreak++;

    resetDailyData();

    updateStatisticsUI();

    saveStatistics();

    saveLastPlayedDate();

}

}

// ===========================================
// END OF FILE
// ===========================================