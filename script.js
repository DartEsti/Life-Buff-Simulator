// Modal

const modal = document.getElementById("taskModal");

const taskTitle = document.getElementById("taskTitle");

const taskXP = document.getElementById("taskXP");

const taskHours = document.getElementById("taskHours");

const timerDisplay = document.getElementById("timer");

const cards = document.querySelectorAll(".task-card");

const closeBtn = document.querySelector(".close");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const resetBtn = document.getElementById("resetBtn");


// XP Rates

const xpRates = {

    "Household Maintenance":15,

    "Exercise":10,

    "Study":25,

    "Work":40,

    "Personal Care":10

};


// Data

const tasks={

"Household Maintenance":{

seconds:0,

xp:0

},

"Exercise":{

seconds:0,

xp:0

},

"Study":{

seconds:0,

xp:0

},

"Work":{

seconds:0,

xp:0

},

"Personal Care":{

seconds:0,

xp:0

}

};


let currentTask=null;

let timer=null;



cards.forEach(card=>{

card.addEventListener("click",()=>{

currentTask=card.dataset.task;

openTask();

});

});


function openTask(){

const task=tasks[currentTask];

taskTitle.textContent=currentTask;

taskXP.textContent=task.xp.toFixed(2)+" XP";

taskHours.textContent=(task.seconds/3600).toFixed(2)+" Hours";

updateTimer();

modal.style.display="flex";

}


function updateTimer(){

const total=tasks[currentTask].seconds;

const hrs=Math.floor(total/3600);

const mins=Math.floor((total%3600)/60);

const secs=total%60;

timerDisplay.textContent=

`${String(hrs).padStart(2,"0")}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

}


// Start

startBtn.onclick=()=>{

if(timer) return;

timer=setInterval(()=>{

tasks[currentTask].seconds++;

tasks[currentTask].xp+=xpRates[currentTask]/3600;

openTask();

},1000);

};


// Pause

pauseBtn.onclick=()=>{

clearInterval(timer);

timer=null;

};


// Reset

resetBtn.onclick=()=>{

clearInterval(timer);

timer=null;

tasks[currentTask].seconds=0;

tasks[currentTask].xp=0;

openTask();

};


// Close

closeBtn.onclick=()=>{

modal.style.display="none";

};


window.onclick=(e)=>{

if(e.target===modal){

modal.style.display="none";

}

};

const modal = document.getElementById("taskModal");

const taskTitle = document.getElementById("taskTitle");

const closeBtn = document.querySelector(".close");

const cards = document.querySelectorAll(".task-card");

cards.forEach(card=>{

card.onclick=()=>{

taskTitle.innerText=card.dataset.task;

modal.style.display="flex";

}

})

closeBtn.onclick=()=>{

modal.style.display="none";

}

window.onclick=(e)=>{

if(e.target==modal){

modal.style.display="none";

}

}
