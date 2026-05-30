let minEle = document.getElementById("min-ele");
let secEle = document.getElementById("sec-ele");
let msecEle = document.getElementById("msec-ele");

let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let resetBtn = document.getElementById("reset-btn");

let setMin = document.getElementById("set-min");
let setSec = document.getElementById("set-sec");

let min = 0;
let sec = 0;
let msec = 0;

let interval = null;
let flag = true;

// Alarm Sound
let audio = new Audio(
  "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
);

// Timer Function
function timer() {
  // stop at exact zero
  if (min === 0 && sec === 0 && msec <= 0) {
    clearInterval(interval);

    min = 0;
    sec = 0;
    msec = 0;

    minEle.textContent = "00 : ";
    secEle.textContent = "00 : ";
    msecEle.textContent = "000";

    audio.play();

    flag = true;

    return;
  }

  msec -= 10;

  // milliseconds complete
  if (msec < 0) {
    msec = 990;

    sec--;
  }

  // seconds complete
  if (sec < 0) {
    sec = 59;

    min--;
  }

  // update UI
  msecEle.textContent = formatMsec(msec);
  secEle.textContent = cancatZero(sec) + " : ";
  minEle.textContent = cancatZero(min) + " : ";
}

// Add Zero
function cancatZero(time) {
  return time <= 9 ? "0" + time : time;
}

// Format Milliseconds
function formatMsec(time) {
  if (time <= 9) {
    return "00" + time;
  } else if (time <= 99) {
    return "0" + time;
  } else {
    return time;
  }
}

// START
startBtn.addEventListener("click", function () {
  if (flag) {
    // set fresh time
    if (min === 0 && sec === 0 && msec === 0) {
      min = Number(setMin.value) || 0;
      sec = Number(setSec.value) || 0;

      msec = 990;
    }

    // validation
    if (min === 0 && sec === 0) {
      alert("Please Enter Time");

      return;
    }

    interval = setInterval(timer, 10);

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

  min = 0;
  sec = 0;
  msec = 0;

  minEle.textContent = "00 : ";
  secEle.textContent = "00 : ";
  msecEle.textContent = "000";

  setMin.value = "";
  setSec.value = "";
});
