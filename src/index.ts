const startBtn = document.getElementById("start") as HTMLButtonElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;
const timerDisplay = document.getElementById("timer") as HTMLDivElement;
const tabs: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".tab");

type Status = "POMODORO" | "SHORT-BREAK" | "LONG-BREAK";

let interval: ReturnType<typeof setInterval>;
let time: number = 1500;
let isRunning: boolean = false;
// let status: Status = "POMODORO";
// let counter: number = 0;

const updateTimer: () => void = () => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  timerDisplay.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const startTimer: () => void = () => {
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

const pauseResumeTimer: () => void = () => {
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

const shortBreak: () => void = () => {
  time = 300;
  resetTimer();
};
const longBreak: () => void = () => {
  time = 900;
  resetTimer();
};

function handleTab(e: MouseEvent) {
  tabs.forEach((tab) => {
    tab.classList.remove("active"), (tab.disabled = false);
  });

  const tabBtn = e.target as HTMLButtonElement;
  if (tabBtn.id === "long-break") {
    longBreak();
  } else if (tabBtn.id === "short-break") {
    shortBreak();
  } else {
    time = 1500;
  }
  resetTimer();

  // console.log(tabBtn.id === "short-break");

  tabBtn.classList.add("active");
  tabBtn.disabled = true;
}
function addListeners() {
  tabs.forEach((tab) => tab.addEventListener("click", handleTab));
}
const resetTimer: () => void = () => {
  clearInterval(interval);
  startBtn.textContent = "Start";
  isRunning = false;
  pauseResumeTimer()
  updateTimer();
};

startBtn.addEventListener("click", pauseResumeTimer);
resetBtn.addEventListener("click", resetTimer);

window.addEventListener("load", addListeners);
