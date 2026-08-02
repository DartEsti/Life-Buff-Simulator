// ===========================================
// LIFE BUFF SIMULATOR
// Version 2.0
// tasks.js
// Multi-Task System
// ===========================================

// ===========================
// DOM ELEMENTS
// ===========================

const cards =
    document.querySelectorAll(".task-card");

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const closeBtn =
    document.querySelector(".close");

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

    if (currentTask === null)
        return;

    const taskName =
        currentTask;

    const task =
        game.tasks[taskName];

    // Prevent duplicate timers

    if (task.isRunning)
        return;

    task.isRunning = true;

    task.timer = setInterval(() => {

        task.seconds++;

        const gainedXP =
            xpRates[taskName] / 3600;

        task.xp += gainedXP;

        addXP(gainedXP);

        game.stats.totalHours +=
            1 / 3600;

        // ===========================
        // Favorite Task
        // ===========================

        let highestSeconds = 0;

        for (const name in game.tasks) {

            if (
                game.tasks[name].seconds >
                highestSeconds
            ) {

                highestSeconds =
                    game.tasks[name].seconds;

                game.stats.favoriteTask =
                    name;

            }

        }

        if (
            highestSeconds / 3600 >
            game.stats.bestTaskHours
        ) {

            game.stats.bestTaskHours =
                highestSeconds / 3600;

        }

        // ===========================
        // Update only the opened task
        // ===========================

        if (
            currentTask === taskName
        ) {

            updateTaskUI(taskName);

        }

        // ===========================
        // Achievements
        // ===========================

        checkAchievements();

        updateAchievementCounter();

        // ===========================
        // Dashboard
        // ===========================

        refreshDashboard();

        saveGame();

    }, 1000);

} 

// ===========================
// PAUSE TASK
// ===========================

function pauseTask() {

    if (currentTask === null)
        return;

    const task =
        game.tasks[currentTask];

    if (!task.isRunning)
        return;

    clearInterval(task.timer);

    task.timer = null;

    task.isRunning = false;

    // ===========================
    // Count completed task once
    // ===========================

    if (!task.completedToday) {

        task.completedToday = true;

        game.stats.totalTasksCompleted++;

    }

    // ===========================
    // Find Favorite Task
    // ===========================

    let highestSeconds = 0;

    for (const taskName in game.tasks) {

        if (
            game.tasks[taskName].seconds >
            highestSeconds
        ) {

            highestSeconds =
                game.tasks[taskName].seconds;

            game.stats.favoriteTask =
                taskName;

        }

    }

    game.stats.bestTaskHours =
        highestSeconds / 3600;

    updateTaskUI(currentTask);

    refreshDashboard();

    saveGame();

}

// ===========================
// CLOSE TASK
// ===========================

function closeTask() {

    // DO NOT pause the timer.
    // Just close the window.

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
// START BUTTON
// ===========================

startBtn.addEventListener("click", () => {

    startTask();

});

// ===========================
// PAUSE BUTTON
// ===========================

pauseBtn.addEventListener("click", () => {

    pauseTask();

});

// ===========================
// CLOSE BUTTON
// ===========================

closeBtn.addEventListener("click", () => {

    closeTask();

});

// ===========================
// CLICK OUTSIDE MODAL
// ===========================

window.addEventListener("click", event => {

    if (event.target === modal) {

        closeTask();

    }

});

// ===========================
// RESTORE RUNNING TASKS
// ===========================

function restoreRunningTasks() {

    for (const taskName in game.tasks) {

        const task = game.tasks[taskName];

        if (!task.isRunning)
            continue;

        task.timer = setInterval(() => {

            task.seconds++;

            const gainedXP =
                xpRates[taskName] / 3600;

            task.xp += gainedXP;

            addXP(gainedXP);

            game.stats.totalHours +=
                1 / 3600;

            let highestSeconds = 0;

            for (const name in game.tasks) {

                if (
                    game.tasks[name].seconds >
                    highestSeconds
                ) {

                    highestSeconds =
                        game.tasks[name].seconds;

                    game.stats.favoriteTask =
                        name;

                }

            }

            game.stats.bestTaskHours =
                highestSeconds / 3600;

            if (currentTask === taskName) {

                updateTaskUI(taskName);

            }

            checkAchievements();

            updateAchievementCounter();

            refreshDashboard();

            saveGame();

        }, 1000);

    }

}

// ===========================================
// END OF FILE
// ===========================================