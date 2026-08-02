// ===========================================
// LIFE BUFF SIMULATOR
// Version 1.0
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
 
    // =======================================
    // ACHIEVEMENTS
    // =======================================

    checkAchievements();

    // =======================================
    // AUTO CHECK NEW DAY
    // =======================================

    setInterval(checkForNewDay, 60000);

    // =======================================
    // LIVE TASK TIMER REFRESH
    // =======================================
 
    console.log("✅ Life Buff Simulator v0.9 Loaded Successfully.");

});

// ===========================================
// END OF FILE
// ===========================================