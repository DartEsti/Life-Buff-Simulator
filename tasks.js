// ===========================================
// LIFE BUFF SIMULATOR
// Version 2.0
// tasks.js
// Multi Task System
// ===========================================

// ===========================
// DOM ELEMENTS
// ===========================

const cards = document.querySelectorAll(".task-card");

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const closeBtn =
    document.querySelector(".close");

// ===========================
// CURRENT OPENED TASK
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

    startTaskTimer(currentTask);

}

// ===========================
// START TASK TIMER
// ===========================

function startTaskTimer(taskName) {

    const task = game.tasks[taskName];

    // Already running?
    if (task.isRunning) return;

    task.isRunning = true;

    task.timer = setInterval(() => {

        task.seconds++;

        const gainedXP =
            xpRates[taskName] / 3600;

        task.xp += gainedXP;

        addXP(gainedXP);

        game.stats.totalHours +=
            1 / 3600;

        checkAchievements();

        updateAchievementCounter();

        updateFavoriteTask();

        updateBestTask();

        // Only refresh the timer on the
        // currently opened modal
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

    pauseTaskTimer(currentTask);

}

// ===========================
// PAUSE TASK TIMER
// ===========================

function pauseTaskTimer(taskName) {

    const task = game.tasks[taskName];

    if (!task.isRunning) return;

    clearInterval(task.timer);

    task.timer = null;

    task.isRunning = false;

    refreshDashboard();

    saveGame();

}

// ===========================
// RESTORE RUNNING TASKS
// ===========================

function restoreRunningTasks() {

    for (const taskName in game.tasks) {

        const task = game.tasks[taskName];

        if (task.isRunning) {

            startTaskTimer(taskName);

        }

    }

}

// ===========================
// FAVORITE TASK
// ===========================

function updateFavoriteTask() {

    let favorite = "None";

    let highestSeconds = 0;

    for (const taskName in game.tasks) {

        if (game.tasks[taskName].seconds > highestSeconds) {

            highestSeconds =
                game.tasks[taskName].seconds;

            favorite = taskName;

        }

    }

    game.stats.favoriteTask = favorite;

}

// ===========================
// BEST TASK
// ===========================

function updateBestTask() {

    let highestHours = 0;

    for (const taskName in game.tasks) {

        const hours =
            game.tasks[taskName].seconds / 3600;

        if (hours > highestHours) {

            highestHours = hours;

        }

    }

    game.stats.bestTaskHours = highestHours;

}

// ===========================
// CLOSE TASK
// ===========================

 function closeTask() {

    hideTaskModal();

    currentTask = null;

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
// INITIALIZE TASK STATES
// ===========================================

for (const taskName in game.tasks) {

    if (typeof game.tasks[taskName].isRunning !== "boolean") {

        game.tasks[taskName].isRunning = false;

    }

    if (game.tasks[taskName].timer === undefined) {

        game.tasks[taskName].timer = null;

    }

}

// ===========================================
// END OF FILE
// ===========================================