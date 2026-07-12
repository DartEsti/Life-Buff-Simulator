// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.5
// script.js
// Main Initialization
// ===========================================

// ===========================
// START GAME
// ===========================

window.addEventListener("DOMContentLoaded", () => {

    // Load previous save

    loadGame();

    // Update all UI
    loadStatistics();

    updateLevelUI();

    updateProductivity();

    updateStatisticsUI();

    renderCalendar();

    // Check if a new day has started

    checkForNewDay();

    // Check every minute

    setInterval(checkForNewDay, 60000);

    console.log("🎮 Life Buff Simulator v0.5 Loaded Successfully");

    console.log(loadDailySummaries());

});