// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.7
// script.js
// Main Initialization
// ===========================================

// ===========================
// START GAME
// ===========================

window.addEventListener("DOMContentLoaded", () => {

    // Load saved progress
    loadGame();

    // Load lifetime statistics
    loadStatistics();

    // Load achievements
    loadAchievements();

    // Build calendar
    renderCalendar();

    // Update all UI
    updateLevelUI();

    updateProductivity();

    updateStatisticsUI();
    
    updateAchievementCounter();

    // Check achievements immediately

    checkAchievements();

    // Check for daily reset

    checkForNewDay();

    // Check every minute

    setInterval(checkForNewDay, 60000);

    console.log("🎮 Life Buff Simulator v0.7 Loaded Successfully");

    console.log(loadDailySummaries());

});