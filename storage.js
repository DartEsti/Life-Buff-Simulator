// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.8
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

// ===========================================
// SAVE GAME
// ===========================================

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

        STORAGE_KEYS.SAVE,
        JSON.stringify(saveData)

    );

    saveStatistics();

}

// ===========================================
// LOAD GAME
// ===========================================

function loadGame() {

    const savedData =
        localStorage.getItem(STORAGE_KEYS.SAVE);

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

        clockInBtn.disabled = isClockedIn;
        clockOutBtn.disabled = !isClockedIn;

        refreshDashboard();

        console.log("Game Loaded Successfully.");

    }

    catch (error) {

        console.error("Corrupted save file.");

        localStorage.removeItem(STORAGE_KEYS.SAVE);

    }

}

// ===========================================
// SAVE PLAYER STATISTICS
// ===========================================

function saveStatistics() {

    localStorage.setItem(

        STORAGE_KEYS.STATISTICS,
        JSON.stringify(game.stats)

    );

}

function loadStatistics() {

    const savedStats =
        localStorage.getItem(STORAGE_KEYS.STATISTICS);

    if (!savedStats) return;

    game.stats = JSON.parse(savedStats);
 
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

        tasks

    };

}

// ===========================================
// SAVE DAILY SUMMARY
// ===========================================

function saveDailySummary() {

    const summary = buildDailySummary();

    let summaries = JSON.parse(

        localStorage.getItem(STORAGE_KEYS.DAILY_SUMMARIES)

    ) || {};

    summaries[summary.date] = summary;

    localStorage.setItem(

        STORAGE_KEYS.DAILY_SUMMARIES,
        JSON.stringify(summaries)

    );

}

// ===========================================
// LOAD DAILY SUMMARIES
// ===========================================

function loadDailySummaries() {

    return JSON.parse(

        localStorage.getItem(STORAGE_KEYS.DAILY_SUMMARIES)

    ) || {};

}

// ===========================================
// GET DAILY SUMMARY
// ===========================================

function getDailySummary(date) {

    return loadDailySummaries()[date] ?? null;

}

// ===========================================
// DELETE SAVE
// ===========================================

function clearSave() {

    const confirmDelete = confirm(

        "Delete ALL saved progress?\n\nThis cannot be undone."

    );

    if (!confirmDelete) return;

    localStorage.removeItem(STORAGE_KEYS.SAVE);
    localStorage.removeItem(STORAGE_KEYS.STATISTICS);
    localStorage.removeItem(STORAGE_KEYS.DAILY_SUMMARIES);
    localStorage.removeItem(STORAGE_KEYS.CALENDAR);
    localStorage.removeItem(STORAGE_KEYS.LAST_PLAYED);

    console.log("🗑 All saved data deleted.");

    location.reload();

}

// ===========================================
// AUTO SAVE
// ===========================================

setInterval(saveGame, 30000);

// ===========================================
// DATE HELPERS
// ===========================================

function getTodayDate() {

    return new Date().toISOString().split("T")[0];

}

function getLastPlayedDate() {

    return localStorage.getItem(STORAGE_KEYS.LAST_PLAYED);

}

function saveLastPlayedDate() {

    localStorage.setItem(

        STORAGE_KEYS.LAST_PLAYED,

        getTodayDate()

    );

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

    }

    else {

        saveDayStatus("missed");

    }

     saveDailySummary();
 
    for (const task in game.tasks) {

        game.tasks[task].seconds = 0;
        game.tasks[task].xp = 0;

    }

    isClockedIn = false;

    clockInDisplay.textContent = "--:--";
    clockOutDisplay.textContent = "--:--";

    clockInBtn.disabled = false;
    clockOutBtn.disabled = true;

    refreshDashboard();

    console.log("✅ Daily progress has been reset.");

}

// ===========================================
// CALENDAR DATA
// ===========================================

function saveDayStatus(status) {

    const today = getTodayDate();

    let calendarData = JSON.parse(

        localStorage.getItem(STORAGE_KEYS.CALENDAR)

    ) || {};

    calendarData[today] = status;

    localStorage.setItem(

        STORAGE_KEYS.CALENDAR,

        JSON.stringify(calendarData)

    );

}

function getCalendarData() {

    return JSON.parse(

        localStorage.getItem(STORAGE_KEYS.CALENDAR)

    ) || {};

}

// ===========================================
// CHECK FOR NEW DAY
// ===========================================

function checkForNewDay() {

    const lastPlayed = getLastPlayedDate();

    const today = getTodayDate();

    // =======================================
    // FIRST TIME OPENING THE GAME
    // =======================================

    if (lastPlayed === null) {

        game.stats.daysPlayed = 1;

        game.stats.currentStreak = 1;

        updateStatisticsUI();

        saveStatistics();

        saveLastPlayedDate();

        console.log("🎉 First launch detected.");

        return;

    }

    // =======================================
    // SAME DAY
    // =======================================

    if (lastPlayed === today) {

        return;

    }

    // =======================================
    // NEW DAY
    // =======================================

    console.log("🌅 New day detected.");

    game.stats.daysPlayed++;

    game.stats.currentStreak++;

    resetDailyData();

    updateStatisticsUI();

    saveStatistics();

    saveLastPlayedDate();

}

// ===========================================
// MANUAL SAVE
// ===========================================

function manualSave() {

    saveGame();

    console.log("💾 Game Saved.");

}

// ===========================================
// MANUAL LOAD
// ===========================================

function manualLoad() {

    loadGame();

    loadStatistics();

    refreshDashboard();

    console.log("📂 Save Loaded.");

}

// ===========================================
// EXPORT SAVE
// ===========================================

function exportSave() {

    const save = localStorage.getItem(

        STORAGE_KEYS.SAVE

    );

    if (!save) {

        alert("No save data found.");

        return;

    }

    const blob = new Blob(

        [save],

        { type: "application/json" }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "LifeBuffSave.json";

    a.click();

    URL.revokeObjectURL(url);

}

// ===========================================
// IMPORT SAVE
// ===========================================

function importSave(jsonData) {

    try {

        JSON.parse(jsonData);

        localStorage.setItem(

            STORAGE_KEYS.SAVE,

            jsonData

        );

        loadGame();

        refreshDashboard();

        console.log("📂 Save Imported.");

    }

    catch {

        alert("Invalid Save File.");

    }

}

// ===========================================
// END OF FILE
// ===========================================