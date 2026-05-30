let hourEle = document.getElementById("hour-ele");
let minEle = document.getElementById("min-ele");
let secEle = document.getElementById("sec-ele");

let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let resetBtn = document.getElementById("reset-btn");
let fullscreenBtn = document.getElementById("fullscreen-btn");
let themeBtn = document.getElementById("theme-btn");

let setHour = document.getElementById("set-hour");
let setMin = document.getElementById("set-min");

let progressCircle = document.querySelector(".progress-circle");
let progressBar = document.getElementById("progress-bar");

let musicUpload = document.getElementById("music-upload");

let hour = 0;
let min = 0;
let sec = 0;

let totalSeconds = 0;
let remainingSeconds = 0;

let interval = null;
let flag = true;

let completedSessions = 0;

let defaultAudio = new Audio(
  "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
);

let customAudio = null;

musicUpload.addEventListener("change", function (e) {
  let file = e.target.files[0];

  if (file) {
    customAudio = new Audio(URL.createObjectURL(file));
  }
});

function formatTime(time) {
  return time <= 9 ? "0" + time : time;
}

function updateDisplay() {
  hourEle.textContent = formatTime(hour);
  minEle.textContent = formatTime(min);
  secEle.textContent = formatTime(sec);
}

function updateProgress() {
  let percent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  progressBar.style.width = percent + "%";

  let circumference = 691;

  let offset = circumference - (percent / 100) * circumference;

  progressCircle.style.strokeDashoffset = offset;
}

function timer() {
  if (hour === 0 && min === 0 && sec === 0) {
    clearInterval(interval);

    flag = true;

    if (customAudio) {
      customAudio.play();
    } else {
      defaultAudio.play();
    }

    if (navigator.vibrate) {
      navigator.vibrate([300, 200, 300]);
    }

    if (Notification.permission === "granted") {
      new Notification("⏰ Timer Completed!");
    }

    return;
  }

  sec--;

  remainingSeconds--;

  if (sec < 0) {
    sec = 59;

    min--;
  }

  if (min < 0) {
    min = 59;

    hour--;
  }

  updateDisplay();

  updateProgress();
}

startBtn.addEventListener("click", function () {
  if (flag) {
    if (hour === 0 && min === 0 && sec === 0) {
      hour = Number(setHour.value) || 0;
      min = Number(setMin.value) || 0;

      // minute validation
      if (min > 59) {
        alert("Minutes cannot be greater than 59");

        return;
      }

      // validation
      if (hour === 0 && min === 0) {
        alert("Please Enter Time");

        return;
      }

      // IMPORTANT LOGIC

      if (min > 0) {
        min--;
        sec = 59;
      }

      if (hour > 0 && min === 0) {
        hour--;
        min = 59;
        sec = 59;
      }

      totalSeconds = hour * 3600 + min * 60 + sec;

      remainingSeconds = totalSeconds;
    }

    updateDisplay();

    interval = setInterval(timer, 1000);

    flag = false;
  }
});
stopBtn.addEventListener("click", function () {
  clearInterval(interval);

  flag = true;

  if (customAudio) {
    customAudio.pause();
    customAudio.currentTime = 0;
  }

  defaultAudio.pause();
  defaultAudio.currentTime = 0;
});

resetBtn.addEventListener("click", function () {
  clearInterval(interval);

  flag = true;

  hour = 0;
  min = 0;
  sec = 0;

  totalSeconds = 0;
  remainingSeconds = 0;

  updateDisplay();

  progressBar.style.width = "0%";

  progressCircle.style.strokeDashoffset = 691;

  setHour.value = "";
  setMin.value = "";

  if (customAudio) {
    customAudio.pause();
    customAudio.currentTime = 0;
  }

  defaultAudio.pause();
  defaultAudio.currentTime = 0;
});

fullscreenBtn.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

setMin.addEventListener("input", function () {
  if (this.value > 59) {
    this.value = 59;
  }

  if (this.value < 0) {
    this.value = 0;
  }
});

document.querySelectorAll(".preset-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    setHour.value = 0;

    setMin.value = this.dataset.time;
  });
});

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}
