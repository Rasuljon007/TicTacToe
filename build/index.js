// src/index.ts
var startBtn = document.getElementById("start");
var resetBtn = document.getElementById("reset");
var timerDisplay = document.getElementById("timer");
var tabs = document.querySelectorAll(".tab");
var interval;
var time = 1500;
var isRunning = false;
var updateTimer = () => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
var startTimer = () => {
  clearInterval(interval);
  interval = setInterval(() => {
    time--, updateTimer();
    isRunning = true;
    if (time === 0) {
      clearInterval(interval);
      updateTimer();
      isRunning = false;
    }
  }, 1000);
};
var pauseResumeTimer = () => {
  if (isRunning) {
    clearInterval(interval);
    startBtn.textContent = "Resume ▶";
    startBtn.classList.remove("pause");
    resetBtn.classList.add("none");
  } else {
    startTimer();
    startBtn.classList.add("pause");
    startBtn.textContent = "Pause ❚❚";
    resetBtn.classList.remove("none");
  }
  isRunning = !isRunning;
};
var shortBreak = () => {
  time = 300;
  resetTimer();
};
var longBreak = () => {
  time = 900;
  resetTimer();
};
function handleTab(e) {
  tabs.forEach((tab) => {
    tab.classList.remove("active"), tab.disabled = false;
  });
  const tabBtn = e.target;
  if (tabBtn.id === "long-break") {
    longBreak();
  } else if (tabBtn.id === "short-break") {
    shortBreak();
  } else {
    time = 1500;
  }
  resetTimer();
  tabBtn.classList.add("active");
  tabBtn.disabled = true;
}
function addListeners() {
  tabs.forEach((tab) => tab.addEventListener("click", handleTab));
}
var resetTimer = () => {
  clearInterval(interval);
  startBtn.textContent = "Start";
  isRunning = false;
  pauseResumeTimer();
  updateTimer();
};
startBtn.addEventListener("click", pauseResumeTimer);
resetBtn.addEventListener("click", resetTimer);
window.addEventListener("load", addListeners);
