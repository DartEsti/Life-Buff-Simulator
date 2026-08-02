// ===========================================
// LIFE BUFF SIMULATOR
// Version 2.0
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
// CURRENT TIME
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

    saveGame();

    refreshDashboard();

    console.log("🟢 Clocked In");

}

// ===========================================
// CLOCK OUT
// ===========================================

function clockOut() {

    if (!isClockedIn) return;

    // Stop every running task

    for (const taskName in game.tasks) {

        pauseTaskTimer(taskName);

    }

    isClockedIn = false;

    clockOutDisplay.textContent =
        getCurrentTime();

    clockInBtn.disabled = false;

    clockOutBtn.disabled = true;

    saveGame();

    refreshDashboard();

    console.log("🔴 Clocked Out");

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

clockInBtn.addEventListener(

    "click",

    clockIn

);

clockOutBtn.addEventListener(

    "click",

    clockOut

);

// ===========================================
// END OF FILE
// ===========================================