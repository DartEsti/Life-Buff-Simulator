// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.8
// session.js
// Session System
// ===========================================

// ===========================================
// DOM ELEMENTS
// ===========================================

const clockInDisplay =
    document.getElementById("clockIn");

const clockOutDisplay =
    document.getElementById("clockOut");

const clockInBtn =
    document.getElementById("clockInBtn");

const clockOutBtn =
    document.getElementById("clockOutBtn");

// ===========================================
// SESSION DATA
// ===========================================

let isClockedIn = false;

// ===========================================
// GET CURRENT TIME
// ===========================================

function getCurrentTime() {

    return new Date().toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}

// ===========================================
// CLOCK IN
// ===========================================

function clockIn() {

    if (isClockedIn) return;

    isClockedIn = true;

    clockInDisplay.textContent =
        getCurrentTime();

    clockInBtn.disabled = true;

    clockOutBtn.disabled = false;

    console.log("🟢 Clocked In");

    refreshDashboard();

    saveGame();

}

// ===========================================
// CLOCK OUT
// ===========================================

function clockOut() {

    if (!isClockedIn) return;

    // Stop running task automatically

    pauseTask();

    isClockedIn = false;

    clockOutDisplay.textContent =
        getCurrentTime();

    clockInBtn.disabled = false;

    clockOutBtn.disabled = true;

    console.log("🔴 Clocked Out");

    refreshDashboard();

    saveGame();

}

// ===========================================
// RESET SESSION
// ===========================================

function resetSession() {

    isClockedIn = false;

    clockInDisplay.textContent = "--:--";

    clockOutDisplay.textContent = "--:--";

    clockInBtn.disabled = false;

    clockOutBtn.disabled = true;

}

// ===========================================
// SESSION STATUS
// ===========================================

function getSessionStatus() {

    return isClockedIn;

}

// ===========================================
// BUTTON EVENTS
// ===========================================

clockInBtn.addEventListener("click", clockIn);

clockOutBtn.addEventListener("click", clockOut);

// ===========================================
// END OF FILE
// ===========================================