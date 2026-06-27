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