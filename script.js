// ===========================================
// LIFE BUFF SIMULATOR
// Version 2.0
// script.js
// Main Initialization
// ===========================================

// ===========================================
// START GAME
// ===========================================

window.addEventListener("DOMContentLoaded", () => {

    console.log("🎮 Starting Life Buff Simulator...");

    // =======================================
    // LOAD SAVE DATA
    // =======================================

    loadGame();

    loadStatistics();

    loadAchievements();

    // =======================================
    // DAILY RESET CHECK
    // =======================================

    checkForNewDay();

    // =======================================
    // BUILD USER INTERFACE
    // =======================================

    renderCalendar();

    initializeUI();

    refreshDashboard();

    updateAchievementCounter();

    // =======================================
    // ACHIEVEMENT CHECK
    // =======================================

    checkAchievements();

    // =======================================
    // RESUME RUNNING TASKS
    // =======================================

    for (const taskName in game.tasks) {

        if (game.tasks[taskName].isRunning) {

            resumeTaskTimer(taskName);

        }

    }

    // =======================================
    // AUTO CHECK NEW DAY
    // =======================================

    setInterval(checkForNewDay, 60000);

    console.log("✅ Life Buff Simulator Version 2.0 Loaded Successfully.");

});

// ===========================================
// END OF FILE
// ===========================================