// ===========================================
// LIFE BUFF SIMULATOR
// Version 2.0
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

        player: game.player,

        maxXP: game.maxXP,

        lastResetDate: game.lastResetDate,

        stats: game.stats,

        isClockedIn: isClockedIn,

        clockInTime: clockInDisplay.textContent,

        clockOutTime: clockOutDisplay.textContent,

        tasks: {}

    };

    // Save every task
    for (const taskName in game.tasks) {

        saveData.tasks[taskName] = {

            seconds: game.tasks[taskName].seconds,

            xp: game.tasks[taskName].xp,

            isRunning: game.tasks[taskName].isRunning

        };

    }

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

        game.level =

            data.level ?? 1;

        game.currentXP =

            data.currentXP ?? 0;

        game.totalLifetimeXP =

            data.totalLifetimeXP ?? 0;

        game.player =

            data.player ?? game.player;

        game.maxXP =

            data.maxXP ?? XP_PER_LEVEL;

        game.lastResetDate =

            data.lastResetDate ?? null;

        game.stats =

            data.stats ?? game.stats;

        isClockedIn =

            data.isClockedIn ?? false;

        clockInDisplay.textContent =

            data.clockInTime ?? "--:--";

        clockOutDisplay.textContent =

            data.clockOutTime ?? "--:--";

        clockInBtn.disabled =

            isClockedIn;

        clockOutBtn.disabled =

            !isClockedIn;

        // Restore every task

        if (data.tasks) {

            for (const taskName in game.tasks) {

                if (data.tasks[taskName]) {

                    game.tasks[taskName].seconds =

                        data.tasks[taskName].seconds ?? 0;

                    game.tasks[taskName].xp =

                        data.tasks[taskName].xp ?? 0;

                    game.tasks[taskName].isRunning =

                        data.tasks[taskName].isRunning ?? false;

                    game.tasks[taskName].timer = null;

                }

            }

        }

        // Restart timers that were running

        restoreRunningTasks();

        refreshDashboard();

        console.log("✅ Save Loaded Successfully.");

    }

    catch (error) {

        console.error(error);

        console.log("❌ Corrupted save file.");

        localStorage.removeItem(

            STORAGE_KEYS.SAVE

        );

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

// ===========================================
// LOAD PLAYER STATISTICS
// ===========================================

function loadStatistics() {

    const savedStats =

        localStorage.getItem(

            STORAGE_KEYS.STATISTICS

        );

    if (!savedStats) return;

    try {

        const data = JSON.parse(savedStats);

        game.stats = {

            totalHours:
                data.totalHours ?? 0,

            totalTasksCompleted:
                data.totalTasksCompleted ?? 0,

            favoriteTask:
                data.favoriteTask ?? "None",

            currentStreak:
                data.currentStreak ?? 0,

            daysPlayed:
                data.daysPlayed ?? 0,

            bestTaskHours:
                data.bestTaskHours ?? 0

        };

    }

    catch {

        console.log("Statistics corrupted.");

    }

}

// ===========================================
// BUILD DAILY SUMMARY
// ===========================================

function buildDailySummary() {

    let totalSeconds = 0;

    let totalXP = 0;

    const tasks = {};

    for (const taskName in game.tasks) {

        const task = game.tasks[taskName];

        const hours = task.seconds / 3600;

        tasks[taskName] = {

            hours: Number(hours.toFixed(2)),

            xp: Number(task.xp.toFixed(2))

        };

        totalSeconds += task.seconds;

        totalXP += task.xp;

    }

    return {

        date: getTodayDate(),

        totalHours:

            Number(

                (totalSeconds / 3600).toFixed(2)

            ),

        totalXP:

            Number(totalXP.toFixed(2)),

        totalTasksCompleted:

            game.stats.totalTasksCompleted,

        favoriteTask:

            game.stats.favoriteTask,

        tasks

    };

}

// ===========================================
// SAVE DAILY SUMMARY
// ===========================================

function saveDailySummary() {

    const summary =

        buildDailySummary();

    let summaries = JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.DAILY_SUMMARIES

        )

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

        localStorage.getItem(

            STORAGE_KEYS.DAILY_SUMMARIES

        )

    ) || {};

}

// ===========================================
// GET DAILY SUMMARY
// ===========================================

function getDailySummary(date) {

    const summaries =

        loadDailySummaries();

    return summaries[date] ?? null;

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

    console.log("🗑 Save Deleted.");

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

    return new Date()

        .toISOString()

        .split("T")[0];

}

function getLastPlayedDate() {

    return localStorage.getItem(

        STORAGE_KEYS.LAST_PLAYED

    );

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

    // Stop every running timer

    for (const taskName in game.tasks) {

        pauseTaskTimer(taskName);

    }

    let totalSeconds = 0;

    for (const taskName in game.tasks) {

        totalSeconds +=

            game.tasks[taskName].seconds;

    }

    if (totalSeconds > 0) {

        saveDayStatus("completed");

    }

    else {

        saveDayStatus("missed");

    }

    saveDailySummary();

    // Reset every task

    for (const taskName in game.tasks) {

        game.tasks[taskName].seconds = 0;

        game.tasks[taskName].xp = 0;

        game.tasks[taskName].timer = null;

        game.tasks[taskName].isRunning = false;

    }

    // Reset session

    isClockedIn = false;

    clockInDisplay.textContent = "--:--";

    clockOutDisplay.textContent = "--:--";

    clockInBtn.disabled = false;

    clockOutBtn.disabled = true;

    refreshDashboard();

    saveGame();

    console.log("🌅 Daily Reset Complete.");

}

// ===========================================
// CALENDAR
// ===========================================

function saveDayStatus(status) {

    const today = getTodayDate();

    let calendarData = JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.CALENDAR

        )

    ) || {};

    calendarData[today] = status;

    localStorage.setItem(

        STORAGE_KEYS.CALENDAR,

        JSON.stringify(calendarData)

    );

}

function getCalendarData() {

    return JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.CALENDAR

        )

    ) || {};

}

// ===========================================
// NEW DAY CHECK
// ===========================================

function checkForNewDay() {

    const today = getTodayDate();

    const lastPlayed = getLastPlayedDate();

    if (lastPlayed === null) {

        game.stats.daysPlayed = 1;

        game.stats.currentStreak = 1;

        saveStatistics();

        saveLastPlayedDate();

        return;

    }

    if (today === lastPlayed) return;

    game.stats.daysPlayed++;

    game.stats.currentStreak++;

    resetDailyData();

    saveStatistics();

    saveLastPlayedDate();

}

// ===========================================
// MANUAL SAVE / LOAD
// ===========================================

function manualSave() {

    saveGame();

    console.log("💾 Game Saved.");

}

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

        {

            type: "application/json"

        }

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

        loadStatistics();

        refreshDashboard();

        console.log("📂 Save Imported.");

    }

    catch {

        alert("Invalid save file.");

    }

}

// ===========================================
// END OF FILE
// ===========================================