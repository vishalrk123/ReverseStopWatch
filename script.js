let hourEle = document.getElementById("hour-ele");
let minEle = document.getElementById("min-ele");
let secEle = document.getElementById("sec-ele");

let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let resetBtn = document.getElementById("reset-btn");

let setHour = document.getElementById("set-hour");
let setMin = document.getElementById("set-min");

let hour = 0;
let min = 0;
let sec = 0;

let interval = null;
let flag = true;

// Alarm Sound

let audio = new Audio(
  "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
);

// Format Time

function formatTime(time) {
  return time <= 9 ? "0" + time : time;
}

// Update Display

function updateDisplay() {
  hourEle.textContent = formatTime(hour);
  minEle.textContent = formatTime(min);
  secEle.textContent = formatTime(sec);
}

// Timer Function

function timer() {
  // Stop at Zero

  if (hour === 0 && min === 0 && sec === 0) {
    clearInterval(interval);

    audio.play();

    flag = true;

    return;
  }

  // Reduce seconds

  if (sec > 0) {
    sec--;
  } else {
    // If seconds 0

    if (min > 0) {
      min--;
      sec = 59;
    } else if (hour > 0) {
      hour--;
      min = 59;
      sec = 59;
    }
  }

  updateDisplay();
}

// START

startBtn.addEventListener("click", function () {
  if (flag) {
    if (hour === 0 && min === 0 && sec === 0) {
      hour = Number(setHour.value) || 0;
      min = Number(setMin.value) || 0;

      // Validation

      if (min > 59) {
        alert("Minutes cannot be greater than 59");

        return;
      }

      // Countdown Logic

      if (hour > 0 && min === 0) {
        hour--;
        min = 59;
        sec = 59;
      } else if (min > 0) {
        min--;
        sec = 59;
      }

      updateDisplay();
    }

    // Validation

    if (hour === 0 && min === 0 && sec === 0) {
      alert("Please Enter Time");

      return;
    }

    interval = setInterval(timer, 1000);

    flag = false;
  }
});

// STOP

stopBtn.addEventListener("click", function () {
  clearInterval(interval);

  flag = true;
});

// RESET

resetBtn.addEventListener("click", function () {
  clearInterval(interval);

  flag = true;

  hour = 0;
  min = 0;
  sec = 0;

  updateDisplay();

  setHour.value = "";
  setMin.value = "";
});

// Minute Validation

setMin.addEventListener("input", function () {
  if (this.value > 59) {
    this.value = 59;
  }

  if (this.value < 0) {
    this.value = 0;
  }
});
