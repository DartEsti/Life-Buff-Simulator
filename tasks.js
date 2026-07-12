// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.5
// tasks.js
// Task System
// ===========================================

// ===========================
// DOM ELEMENTS
// ===========================

const cards = document.querySelectorAll(".task-card");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const closeBtn = document.querySelector(".close");

// ===========================
// OPEN TASK
// ===========================

function openTask(taskName) {

    currentTask = taskName;

    updateTaskUI(taskName);

    showTaskModal();

}

// ===========================
// START TASK
// ===========================

function startTask() {

    if (!isClockedIn) {

        alert("🕒 Please Clock In before starting a task.");

        return;

    }

    if (currentTask === null) return;

    // Stop previous timer

    if (game.timer !== null) {

        clearInterval(game.timer);

        game.timer = null;

    }

    game.activeTask = currentTask;

    game.timer = setInterval(() => {

        const task = game.tasks[game.activeTask];

        task.seconds++;

        const gainedXP = xpRates[game.activeTask] / 3600;

        task.xp += gainedXP;

        addXP(gainedXP);

        game.stats.totalHours += 1 / 3600;

        let highestHours = 0;

    for (const taskName in game.tasks) {

    const hours = game.tasks[taskName].seconds / 3600;

    if (hours > highestHours) {

        highestHours = hours;

        game.stats.favoriteTask = taskName;

    }

}

    if (highestHours > game.stats.bestTaskHours) {

    game.stats.bestTaskHours = highestHours;

}

        refreshCurrentTask();

        updateProductivity();

        updateStatisticsUI();

        saveStatistics();

        saveGame();

    }, 1000);

}

// ===========================
// PAUSE TASK
// ===========================

function pauseTask() {

    if (currentTask !== null &&
        game.tasks[currentTask].seconds > 0) {

        game.stats.totalTasksCompleted++;

    }

    if (game.timer !== null) {

        clearInterval(game.timer);

        game.timer = null;

    }

    game.activeTask = null;

    updateProductivity();

    updateStatisticsUI();

    saveStatistics();

    saveGame();

}

// ===========================
// CLOSE TASK
// ===========================

function closeTask() {

    pauseTask();

    hideTaskModal();

}

// ===========================
// TASK CARD EVENTS
// ===========================

cards.forEach(card => {

    card.addEventListener("click", () => {

        openTask(card.dataset.task);

    });

});

// ===========================
// BUTTON EVENTS
// ===========================

startBtn.addEventListener("click", () => {

    startTask();

});

pauseBtn.addEventListener("click", () => {

    pauseTask();

});

closeBtn.addEventListener("click", () => {

    closeTask();

});

// ===========================
// CLICK OUTSIDE MODAL
// ===========================

window.addEventListener("click", (event) => {

    if (event.target === modal) {

        closeTask();

    }

});

// ===========================================
// END OF FILE
// ===========================================