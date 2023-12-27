const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const deteEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElement = document.querySelectorAll("span");
const completeEl = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let saveedCountdowm;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
//set Date input with Todays Date

const today = new Date().toISOString().split("T")[0];
deteEl.setAttribute("min", today);

function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minuts = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //Hide Inputs
    inputContainer.hidden = true;

    //if the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElement[0].textContent = `${days}`;
      timeElement[1].textContent = `${hours}`;
      timeElement[2].textContent = `${minuts}`;
      timeElement[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  saveedCountdowm = {
    title:countdownTitle,
    date:countdownDate
  }
  localStorage.setItem('countdown', JSON.stringify(saveedCountdowm));
  // check for valid date
  if (countdownDate === "") {
    alert("please select a date for the countdown.");
  } else {
    //get number version of current date, updateDom
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

//reset all values
function reset() {
  // Hide countdowns, show input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  //stop the countdown
  clearInterval(countdownActive);
  //Reset value
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
   if(localStorage.getItem('countdown')){
     inputContainer.hidden = true;
     saveedCountdowm = JSON.parse(localStorage.getItem('countdown'));
     countdownTitle = saveedCountdowm.title;
     countdownDate = saveedCountdowm.date;
     countdownValue = new Date(countdownDate).getTime();
     updateDom();
   }
}


countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

restorePreviousCountdown();
