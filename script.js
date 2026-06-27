// ================================
// LIFE BUFF SIMULATOR - PHASE 2
// script.js
// ================================

// ---------- Elements ----------

const modal = document.getElementById("taskModal");
const taskTitle = document.getElementById("taskTitle");
const taskXP = document.getElementById("taskXP");
const taskHours = document.getElementById("taskHours");
const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const closeBtn = document.querySelector(".close");
const cards = document.querySelectorAll(".task-card");

// ---------- XP Rates ----------

const xpRates = {
    "Household Maintenance": 15,
    "Exercise": 10,
    "Study": 25,
    "Work": 40,
    "Personal Care": 10
};

// ---------- Task Data ----------

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

// ---------- Variables ----------

let currentTask = null;
let timer = null;

// ---------- Task Cards ----------

cards.forEach(card => {

    card.addEventListener("click", () => {

        currentTask = card.dataset.task;

        showTask();

        modal.style.display = "flex";

    });

});

// ---------- Display Task ----------

function showTask() {

    const task = tasks[currentTask];

    taskTitle.textContent = currentTask;

    taskXP.textContent = task.xp.toFixed(2) + " XP";

    taskHours.textContent = (task.seconds / 3600).toFixed(2) + " Hours";

    updateTimer();

}

// ---------- Timer ----------

function updateTimer() {

    const totalSeconds = tasks[currentTask].seconds;

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    timerDisplay.textContent =
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

// ---------- Start ----------

startBtn.addEventListener("click", () => {

    if (currentTask === null) return;

    if (timer !== null) return;

    timer = setInterval(() => {

        tasks[currentTask].seconds++;

        tasks[currentTask].xp += xpRates[currentTask] / 3600;

        showTask();

    }, 1000);

});

// ---------- Pause ----------

pauseBtn.addEventListener("click", () => {

    clearInterval(timer);

    timer = null;

});

// ---------- Reset ----------

resetBtn.addEventListener("click", () => {

    if (currentTask === null) return;

    clearInterval(timer);

    timer = null;

    tasks[currentTask].seconds = 0;

    tasks[currentTask].xp = 0;

    showTask();

});

// ---------- Close Modal ----------

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});