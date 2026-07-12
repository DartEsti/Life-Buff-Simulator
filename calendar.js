// ===========================================
// LIFE BUFF SIMULATOR
// Version 0.6
// calendar.js
// Calendar System
// ===========================================

// ===========================
// DOM ELEMENTS
// ===========================

const calendarGrid = document.getElementById("calendarGrid");
const calendarTitle = document.getElementById("calendarTitle");

const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

// ===========================
// CURRENT DATE
// ===========================

let currentDate = new Date();

let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// ===========================
// MONTH NAMES
// ===========================

const monthNames = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",

    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];

// ===========================
// BUILD CALENDAR
// ===========================

function renderCalendar() {

    calendarGrid.innerHTML = "";

    calendarTitle.textContent =
        `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay =
        new Date(currentYear, currentMonth, 1).getDay();

    const daysInMonth =
        new Date(currentYear, currentMonth + 1, 0).getDate();

    // Empty boxes

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");

        empty.className = "calendar-day empty";

        calendarGrid.appendChild(empty);

    }

    // Days

    for (let day = 1; day <= daysInMonth; day++) {

        const dayBox = document.createElement("div");

        dayBox.className = "calendar-day";

        dayBox.textContent = day;

        const dateKey =
`${currentYear}-${String(currentMonth + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

const calendarData = getCalendarData();

if (calendarData[dateKey] === "completed") {

    dayBox.classList.add("completed");

}

if (calendarData[dateKey] === "missed") {

    dayBox.classList.add("missed");

}

        const today = new Date();

        if (

            day === today.getDate() &&

            currentMonth === today.getMonth() &&

            currentYear === today.getFullYear()

        ) {

            dayBox.classList.add("today");

        }

        calendarGrid.appendChild(dayBox);

    }

}

// ===========================
// PREVIOUS MONTH
// ===========================

prevMonthBtn.addEventListener("click", () => {

    currentMonth--;

    if (currentMonth < 0) {

        currentMonth = 11;

        currentYear--;

    }

    renderCalendar();

});

// ===========================
// NEXT MONTH
// ===========================

nextMonthBtn.addEventListener("click", () => {

    currentMonth++;

    if (currentMonth > 11) {

        currentMonth = 0;

        currentYear++;

    }

    renderCalendar();

});

// ===========================
// INITIALIZE
// ===========================

renderCalendar();

// ===========================================
// END OF FILE
// ===========================================