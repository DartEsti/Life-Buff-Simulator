// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.9
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

    refreshDashboard();

    updateAchievementCounter();

    // Player Profile (Version 0.9)

    if (typeof updatePlayerProfile === "function") {

        updatePlayerProfile();

    }

    // =======================================
    // ACHIEVEMENTS
    // =======================================

    checkAchievements();

    // =======================================
    // AUTO CHECK NEW DAY
    // =======================================

    setInterval(() => {

        checkForNewDay();

    }, 60000);

    // =======================================
    // LIVE TASK TIMER REFRESH
    // =======================================

    setInterval(() => {

        refreshCurrentTask();

    }, 1000);

    console.log("✅ Life Buff Simulator v0.9 Loaded Successfully.");

});

// ===========================================
// END OF FILE
// ===========================================