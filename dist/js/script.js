import { START_DATE_STRING } from "./constants.js";
import { createAnimation } from "./animation.js";
import { populateWithUnits } from "./mapUtils.js";
import { ANIMATION_STEPS, UNITS } from "./data.js";

// Add new units here
// const UNITS = [
//   { id: "ghq218", data: "svg/hq-218.svg" },
//   { id: "ghq218I", data: "svg/hq-218-I.svg" },
//   { id: "ghq218II", data: "svg/hq-218-II.svg" },
//   { id: "g218I", data: "svg/218-I.svg" },
//   { id: "g218II", data: "svg/218-II.svg" },
//   { id: "g218III", data: "svg/218-III.svg" },
//   { id: "gII8", data: "svg/II-8.svg" },
//   { id: "g21816", data: "svg/218-16.svg" },
//   { id: "jp2", data: "svg/jp2.svg" },
//   { id: "jp3", data: "svg/jp3.svg" },
//   { id: "jp4", data: "svg/jp4.svg" },
//   { id: "jp5", data: "svg/jp5.svg" },
// ];

// TODO: add german units and svg in creation function !

// function populateWithUnits() {
//   // Populate map with units
//   const map = document.getElementById("map");
//   // Required by foreignObject creation
//   const ns = "http://www.w3.org/2000/svg";

//   UNITS.forEach((unit) => {
//     const newUnitElement = document.createElementNS(ns, "foreignObject");
//     newUnitElement.setAttribute("class", "symbol-wrapper");
//     // newUnitElement.setAttribute("x", unit.x);
//     // newUnitElement.setAttribute("y", unit.y);
//     newUnitElement.setAttribute("x", 0);
//     newUnitElement.setAttribute("y", 0);
//     const obj = document.createElement("object");
//     obj.className = "unit-symbol";
//     obj.id = unit.id;
//     obj.data = unit.data;
//     obj.type = "image/svg+xml";
//     newUnitElement.appendChild(obj);
//     map.appendChild(newUnitElement);
//   });
// }

// Animation

function playHandler() {
  if (tl.reversed()) {
    tl.reverse();
  }
  if (tl.paused()) {
    tl.resume();
    return;
  }
  showPauseButton();
  tl.play();
}

function pauseHandler() {
  showPlayButton();
  if (!tl.paused()) tl.pause();
}

function restartHandler() {
  tl.pause().seek("step-1").resume();
  if (tl.reversed()) {
    tl.reverse();
  }
  toggleDisablePlayButton(false);
  showPauseButton();
}

function reverseHandler() {
  tl.reverse();
  toggleDisablePlayButton(false);
  showPauseButton();
}

function endHandler() {
  showPlayButton();
  toggleDisablePlayButton(true);
}

function toggleDisablePlayButton(isDisabled) {
  playButton.disabled = isDisabled;
}

function showPlayButton() {
  playButton.classList.add("show");
  pauseButton.classList.remove("show");
}

function showPauseButton() {
  playButton.classList.remove("show");
  pauseButton.classList.add("show");
}

function updateBattleTime(step) {
  battleTime.textContent = formatBattleTime(step);
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
const restartButton = document.getElementById("restart-btn");
const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const reverseButton = document.getElementById("reverse-btn");
const battleTime = document.getElementById("battle-time");

restartButton.addEventListener("click", restartHandler);
playButton.addEventListener("click", playHandler);
pauseButton.addEventListener("click", pauseHandler);
reverseButton.addEventListener("click", reverseHandler);

populateWithUnits(document.getElementById("map"), UNITS);

updateBattleTime(0);

const tl = createAnimation(
  ANIMATION_STEPS,
  (step) => {
    updateBattleTime(step);
  },
  () => {
    endHandler();
  }
);
