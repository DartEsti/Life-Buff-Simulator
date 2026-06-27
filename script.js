// ========================================
// LIFE BUFF SIMULATOR
// Phase 2 - Part 2
// ========================================

// ---------- ELEMENTS ----------

const modal = document.getElementById("taskModal");
const taskTitle = document.getElementById("taskTitle");
const taskXP = document.getElementById("taskXP");
const taskHours = document.getElementById("taskHours");
const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");

const closeBtn = document.querySelector(".close");
const cards = document.querySelectorAll(".task-card");

// ---------- XP RATES ----------

const xpRates = {
    "Household Maintenance": 15,
    "Exercise": 10,
    "Study": 25,
    "Work": 40,
    "Personal Care": 10
};

// ---------- TASK DATA ----------

const tasks = {

    "Household Maintenance": {
        seconds: 0,
        xp: 0
    },

    "Exercise": {
        seconds: 0,
        xp: 0
    },

    "Study": {
        seconds: 0,
        xp: 0
    },

    "Work": {
        seconds: 0,
        xp: 0
    },

    "Personal Care": {
        seconds: 0,
        xp: 0
    }

};

// ---------- VARIABLES ----------

let currentTask = null;
let activeTask = null;
let timer = null;

// ---------- TASK CARDS ----------

cards.forEach(card => {

    card.addEventListener("click", () => {

        currentTask = card.dataset.task;

        showTask();

        modal.style.display = "flex";

    });

});

// ---------- DISPLAY TASK ----------

function showTask() {

    const task = tasks[currentTask];

    taskTitle.textContent = currentTask;

    taskXP.textContent = task.xp.toFixed(2) + " XP";

    taskHours.textContent = (task.seconds / 3600).toFixed(2) + " Hours";

    updateTimer();

}

// ---------- TIMER DISPLAY ----------

function updateTimer() {

    const total = tasks[currentTask].seconds;

    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    timerDisplay.textContent =
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

// ---------- START TIMER ----------

startBtn.addEventListener("click", () => {

    if (currentTask === null) return;

    // Stop previous task if another one is running
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }

    activeTask = currentTask;

    timer = setInterval(() => {

        tasks[activeTask].seconds++;

        tasks[activeTask].xp += xpRates[activeTask] / 3600;

        if (currentTask === activeTask) {
            showTask();
        }

    }, 1000);

});

// ---------- PAUSE TIMER ----------

pauseBtn.addEventListener("click", () => {

    clearInterval(timer);

    timer = null;

    activeTask = null;

});

// ---------- CLOSE MODAL ----------

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

// ---------- CLICK OUTSIDE MODAL ----------

window.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});