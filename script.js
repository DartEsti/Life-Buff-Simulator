// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.8
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
    // DAILY RESET
    // =======================================

     checkForNewDay();
 
    setInterval(checkForNewDay, 60000);

    // =======================================
    // AUTO REFRESH CURRENT TASK
    // =======================================

    setInterval(() => {

        refreshCurrentTask();

    }, 1000);

    console.log("✅ Life Buff Simulator v0.8 Loaded Successfully.");

});