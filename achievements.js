// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.7
// achievements.js
// ===========================================

// ===========================
// DOM ELEMENTS
// ===========================

const achievementCount =
    document.getElementById("achievementCount");

const viewAchievementsBtn =
    document.getElementById("viewAchievementsBtn");

// ===========================
// ACHIEVEMENTS
// ===========================

const achievements = [

    {
        id: "first_study",
        name: "📚 First Study Session",
        description: "Study for the first time.",
        unlocked: false
    },

    {
        id: "first_workout",
        name: "💪 First Workout",
        description: "Exercise for the first time.",
        unlocked: false
    },

    {
        id: "one_hour",
        name: "⏱ One Productive Hour",
        description: "Reach 1 hour of productive time.",
        unlocked: false
    },

    {
        id: "level5",
        name: "⭐ Level 5",
        description: "Reach Level 5.",
        unlocked: false
    },

    {
        id: "level10",
        name: "⭐⭐ Level 10",
        description: "Reach Level 10.",
        unlocked: false
    },

    {
        id: "level25",
        name: "⭐⭐⭐ Level 25",
        description: "Reach Level 25.",
        unlocked: false
    },

    {
        id: "ten_hours",
        name: "🏆 Ten Productive Hours",
        description: "Reach 10 productive hours.",
        unlocked: false
    }

];

// ===========================
// UPDATE COUNTER
// ===========================

function updateAchievementCounter() {

    const unlocked =
        achievements.filter(a => a.unlocked).length;

    achievementCount.textContent =
        `${unlocked} / ${achievements.length}`;

}

// ===========================
// POPUP
// ===========================

function showAchievementPopup(title) {

    const popup = document.createElement("div");

    popup.className = "achievement-popup";

    popup.innerHTML = `

        <h3>🏆 Achievement Unlocked!</h3>

        <p>${title}</p>

    `;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.classList.add("show");

    },100);

    setTimeout(() => {

        popup.classList.remove("show");

        setTimeout(()=>{

            popup.remove();

        },400);

    },3500);

}

// ===========================
// UNLOCK
// ===========================

function unlockAchievement(id){

    const achievement =
        achievements.find(a=>a.id===id);

    if(!achievement) return;

    if(achievement.unlocked) return;

    achievement.unlocked = true;

    updateAchievementCounter();

    saveAchievements();

    showAchievementPopup(achievement.name);

}

// ===========================
// SAVE
// ===========================

function saveAchievements(){

    localStorage.setItem(

        "lifeBuffAchievements",

        JSON.stringify(achievements)

    );

}

function loadAchievements(){

    const saved =
        localStorage.getItem("lifeBuffAchievements");

    if(!saved){

        updateAchievementCounter();

        return;

    }

    const data = JSON.parse(saved);

    data.forEach(savedAchievement=>{

        const achievement =
            achievements.find(
                a=>a.id===savedAchievement.id
            );

        if(achievement){

            achievement.unlocked =
                savedAchievement.unlocked;

        }

    });

    updateAchievementCounter();

}

// ===========================
// CHECK ACHIEVEMENTS
// ===========================

function checkAchievements(){

    if(game.tasks["Study"].seconds>0){

        unlockAchievement("first_study");

    }

    if(game.tasks["Exercise"].seconds>0){

        unlockAchievement("first_workout");

    }

    let totalSeconds = 0;

    for(const task in game.tasks){

        totalSeconds += game.tasks[task].seconds;

    }

    if(totalSeconds>=3600){

        unlockAchievement("one_hour");

    }

    if(totalSeconds>=36000){

        unlockAchievement("ten_hours");

    }

    if(game.level>=5){

        unlockAchievement("level5");

    }

    if(game.level>=10){

        unlockAchievement("level10");

    }

    if(game.level>=25){

        unlockAchievement("level25");

    }

}

// ===========================
// BUTTON
// ===========================

viewAchievementsBtn.addEventListener("click",()=>{

    let text="🏆 ACHIEVEMENTS\n\n";

    achievements.forEach(a=>{

        text +=

`${a.unlocked ? "✅" : "⬜"} ${a.name}

`;

    });

    alert(text);

});

// ===========================
// INITIALIZE
// ===========================

loadAchievements();