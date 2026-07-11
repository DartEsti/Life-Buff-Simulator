// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.5
// storage.js
// Save System
// ===========================================

// ===========================
// SAVE GAME
// ===========================

function saveGame() {

    const saveData = {

        level: game.level,

        currentXP: game.currentXP,

        totalLifetimeXP: game.totalLifetimeXP,

        maxXP: game.maxXP,

        lastResetDate: game.lastResetDate,

        activeTask: game.activeTask,

        tasks: game.tasks,

        isClockedIn: isClockedIn,

        clockInTime: clockInDisplay.textContent,

        clockOutTime: clockOutDisplay.textContent

    };

    localStorage.setItem(
        "lifeBuffSave",
        JSON.stringify(saveData)
    );

}

// ===========================
// LOAD GAME
// ===========================

function loadGame() {

    const savedData = localStorage.getItem("lifeBuffSave");

    if (!savedData) {

        console.log("No save data found.");

        return;

    }

    try {

        const data = JSON.parse(savedData);

        game.level = data.level ?? 1;
        game.currentXP = data.currentXP ?? 0;
        game.totalLifetimeXP = data.totalLifetimeXP ?? 0;
        game.maxXP = data.maxXP ?? XP_PER_LEVEL;
        game.lastResetDate = data.lastResetDate ?? null;
        game.activeTask = data.activeTask ?? null;
        game.tasks = data.tasks ?? game.tasks;

        isClockedIn = data.isClockedIn ?? false;

        clockInDisplay.textContent =
            data.clockInTime ?? "--:--";

        clockOutDisplay.textContent =
            data.clockOutTime ?? "--:--";

        if (isClockedIn) {

            clockInBtn.disabled = true;
            clockOutBtn.disabled = false;

        } else {

            clockInBtn.disabled = false;
            clockOutBtn.disabled = true;

        }

        updateLevelUI();
        updateProductivity();

        console.log("Game Loaded Successfully.");

    }

    catch (error) {

        console.error("Corrupted save file.");

        localStorage.removeItem("lifeBuffSave");

    }

}

// ===========================
// DELETE SAVE
// ===========================

function clearSave() {

    const confirmDelete = confirm(

        "Delete ALL saved progress?\n\nThis cannot be undone."

    );

    if (!confirmDelete) return;

    localStorage.removeItem("lifeBuffSave");

    location.reload();

}

// ===========================
// AUTO SAVE
// ===========================

setInterval(() => {

    saveGame();

}, 30000);

// ===========================================
// END OF FILE
// ===========================================