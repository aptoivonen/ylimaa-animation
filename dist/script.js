// Add new units here
const UNITS = [
  { id: "hq-218", data: "svg/hq-218.svg", x: 720, y: 300 },
  { id: "hq-218-II", data: "svg/hq-218-II.svg", x: 560, y: 210 },
  { id: "218-I", data: "svg/218-I.svg", x: 800, y: 730 },
  { id: "218-II", data: "svg/218-II.svg", x: 520, y: 130 },
  { id: "218-III", data: "svg/218-III.svg", x: 1100, y: 830 },
  { id: "II-8", data: "svg/II-8.svg", x: 80, y: 450 },
  { id: "218-16", data: "svg/218-16.svg", x: 1030, y: 950 },
  { id: "jp2", data: "svg/jp2.svg", x: -999, y: -999 },
  { id: "jp3", data: "svg/jp3.svg", x: 250, y: 1000 },
  { id: "jp4", data: "svg/jp4.svg", x: -999, y: -999 },
  { id: "jp5", data: "svg/jp5.svg", x: 1070, y: 1020 },
];

// Populate map with units
const map = document.getElementById("map");
// Required by foreignObject creation
const ns = "http://www.w3.org/2000/svg";

UNITS.forEach((unit) => {
  const newUnitElement = document.createElementNS(ns, "foreignObject");
  newUnitElement.setAttribute("class", "symbol-wrapper");
  newUnitElement.setAttribute("x", unit.x);
  newUnitElement.setAttribute("y", unit.y);
  const obj = document.createElement("object");
  obj.className = "unit-symbol";
  obj.id = unit.id;
  obj.data = unit.data;
  obj.type = "image/svg+xml";
  newUnitElement.appendChild(obj);
  map.appendChild(newUnitElement);
});

// Animation
const STEP_DURATION = 1;
const START_DATE_STRING = "October 7, 1944 06:00:00";
let step = 1;
const animationSteps = [
  { jp3: { x: 100, y: -100 } },
  { jp3: { x: 0, y: -200 } },
  {},
  { jp3: { x: -50, y: -300 }, "218-16": { x: 0, y: -50 } },
];

const unitEls = Object.fromEntries(
  UNITS.map((unit) => [unit.id, document.getElementById(unit.id)])
);
const tl = gsap.timeline();
let intervalId;
let isPlaying = false;

function takeStep() {
  step++;
  if (!stepsLeft()) return;
  updateBattleTime();
  animationData = animationSteps[step - 2];
  if (animationData) {
    Object.entries(animationData).forEach(([unitId, delta]) => {
      const unitEl = unitEls[unitId];
      tl.to(
        unitEl,
        { duration: STEP_DURATION, x: delta.x, y: delta.y },
        `step-${step}`
      );
    });
  }
}

function play() {
  isPlaying = true;
  intervalId = setInterval(() => {
    if (!stepsLeft()) {
      clearInterval(intervalId);
      forwardButton.disabled = true;
    }
    takeStep();
  }, Math.floor(1000 * STEP_DURATION));
}

function pause() {
  isPlaying = false;
  if (intervalId) clearInterval(intervalId);
}

function forward() {
  if (!stepsLeft()) return;
  takeStep();
}

function restart() {
  step = 1;
  updateBattleTime();
  forwardButton.disabled = false;
}

function stepsLeft() {
  return step - 2 < animationSteps.length;
}

function playHandler() {
  playButton.classList.remove("show");
  pauseButton.classList.add("show");
  if (stepsLeft()) {
    play();
  }
}

function pauseHandler() {
  playButton.classList.add("show");
  pauseButton.classList.remove("show");
  pause();
}

function forwardHandler() {
  pauseHandler();
  if (!stepsLeft()) {
    forwardButton.disabled = true;
    return;
  }
  takeStep();
}

function restartHandler() {
  pauseHandler();
  restart();
}

function updateBattleTime() {
  battleTime.textContent = formatBattleTime(step - 1);
}

function formatBattleTime(step) {
  const date = new Date(START_DATE_STRING);
  date.setHours(step + date.getHours());
  return new Intl.DateTimeFormat("fi", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

// Set up controls
const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const restartButton = document.getElementById("restart-btn");
const forwardButton = document.getElementById("step-btn");
const battleTime = document.getElementById("battle-time");

playButton.addEventListener("click", playHandler);
pauseButton.addEventListener("click", pauseHandler);
restartButton.addEventListener("click", restartHandler);
forwardButton.addEventListener("click", forwardHandler);

updateBattleTime();
