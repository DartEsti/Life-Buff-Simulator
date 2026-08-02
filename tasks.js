// ===========================================
// LIFE BUFF SIMULATOR
// Version 1.0
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

    const taskName = currentTask;

    const task = game.tasks[taskName];

    if (task.isRunning) return;

    task.isRunning = true;

    task.timer = setInterval(() => {

        task.seconds++;

        const gainedXP = xpRates[taskName] / 3600;

        task.xp += gainedXP;

        addXP(gainedXP);

        checkAchievements();

        updateAchievementCounter();

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

        if (currentTask === taskName) {

        updateTaskUI(taskName);

    }

        refreshDashboard();

        saveGame();

    }, 1000);

}

// ===========================
// PAUSE TASK
// ===========================

function pauseTask() {

    if (currentTask === null) return;

    const task = game.tasks[taskName];

    if (!task.isRunning) return;

    clearInterval(task.timer);

    task.timer = null;

    task.isRunning = false;

    refreshDashboard();

    saveGame();

}
 
// ===========================
// CLOSE TASK
// ===========================

function closeTask() {
 
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