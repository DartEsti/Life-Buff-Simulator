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

    const saveTasks = {};

    for (const taskName in game.tasks) {

        const task = game.tasks[taskName];

        saveTasks[taskName] = {

            seconds: task.seconds,

            xp: task.xp,

            isRunning: task.isRunning,

            completedToday: task.completedToday

        };

    }

    const saveData = {

        level: game.level,

        currentXP: game.currentXP,

        totalLifetimeXP: game.totalLifetimeXP,

        player: game.player,

        maxXP: game.maxXP,

        lastResetDate: game.lastResetDate,

        tasks: saveTasks,

        isClockedIn: isClockedIn,

        clockInTime:
            clockInDisplay.textContent,

        clockOutTime:
            clockOutDisplay.textContent

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

        localStorage.getItem(

            STORAGE_KEYS.SAVE

        );

    if (!savedData) {

        console.log(

            "No save data found."

        );

        return;

    }

    try {

        const data =

            JSON.parse(savedData);

        game.level =
            data.level ?? 1;

        game.currentXP =
            data.currentXP ?? 0;

        game.totalLifetimeXP =
            data.totalLifetimeXP ?? 0;

        game.player =
            data.player ?? {

                name: "Player",

                title: "Beginner",

                avatar: "😀"

            };

        game.maxXP =
            data.maxXP ?? XP_PER_LEVEL;

        game.lastResetDate =
            data.lastResetDate ?? null;

        // ===========================
        // LOAD TASKS
        // ===========================

        if (data.tasks) {

            for (const taskName in game.tasks) {

                const savedTask =
                    data.tasks[taskName];

                if (!savedTask)
                    continue;

                game.tasks[taskName].seconds =
                    savedTask.seconds ?? 0;

                game.tasks[taskName].xp =
                    savedTask.xp ?? 0;

                game.tasks[taskName].isRunning =
                    savedTask.isRunning ?? false;

                game.tasks[taskName].completedToday =
                    savedTask.completedToday ?? false;

                game.tasks[taskName].timer =
                    null;

            }

        }

        // ===========================
        // SESSION
        // ===========================

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

        // ===========================
        // RESTORE TIMERS
        // ===========================

        restoreRunningTasks();

        refreshDashboard();

        console.log(

            "✅ Game Loaded."

        );

    }

    catch (error) {

        console.error(

            "Corrupted save file.",

            error

        );

        localStorage.removeItem(

            STORAGE_KEYS.SAVE

        );

    }

}

