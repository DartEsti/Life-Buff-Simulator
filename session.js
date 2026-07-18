// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.5
// session.js
// Session System
// ===========================================

// ===========================
// DOM ELEMENTS
// ===========================

const clockInDisplay = document.getElementById("clockIn");
const clockOutDisplay = document.getElementById("clockOut");

const clockInBtn = document.getElementById("clockInBtn");
const clockOutBtn = document.getElementById("clockOutBtn");

// ===========================
// SESSION DATA
// ===========================

let isClockedIn = false;

// ===========================
// GET CURRENT TIME
// ===========================

function getCurrentTime() {

    return new Date().toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}

// ===========================
// CLOCK IN
// ===========================

function clockIn() {

    if (isClockedIn) return;

    isClockedIn = true;

    clockInDisplay.textContent = getCurrentTime();

    clockInBtn.disabled = true;

    clockOutBtn.disabled = false;

    saveGame();

}

// ===========================
// CLOCK OUT
// ===========================

function clockOut() {

    if (!isClockedIn) return;

    isClockedIn = false;

    clockOutDisplay.textContent = getCurrentTime();

    clockOutBtn.disabled = true;

    clockInBtn.disabled = false;

    refreshDashboard();

    saveGame();

}

// ===========================
// RESET SESSION
// ===========================

function resetSession() {

    isClockedIn = false;

    clockInDisplay.textContent = "--:--";

    clockOutDisplay.textContent = "--:--";

    clockInBtn.disabled = false;

    clockOutBtn.disabled = true;

}

// ===========================
// BUTTON EVENTS
// ===========================

clockInBtn.addEventListener("click", () => {

    clockIn();

});

clockOutBtn.addEventListener("click", () => {

    clockOut();

});

// ===========================================
// END OF FILE
// ===========================================