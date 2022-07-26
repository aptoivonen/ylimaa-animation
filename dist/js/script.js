import { UNIT_TYPES, AFFILIATION, ECHELON } from "./constants.js";
import { createAnimation } from "./animation.js";
import { populateWithUnits, createUnitSvg } from "./mapUtils.js";
import { ANIMATION_STEPS, UNITS } from "./data.js";
import { formatBattleTime } from "./services.js";

// Set up controls
const restartButton = document.getElementById("restart-btn");
const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const reverseButton = document.getElementById("reverse-btn");
const battleTime = document.getElementById("battle-time");
const germanUnitList = document.getElementById("german-unit-list");
const finnishUnitList = document.getElementById("finnish-unit-list");
const map = document.getElementById("map");
const progress = document.getElementById("progress");

restartButton.addEventListener("click", restartHandler);
playButton.addEventListener("click", playHandler);
pauseButton.addEventListener("click", pauseHandler);
reverseButton.addEventListener("click", reverseHandler);

// create unit svgs
populateWithUnits(map, UNITS);

// create unit info lists
populateUnitLists(germanUnitList, finnishUnitList);

// set up time
updateBattleTime(0);

// create animation
const tl = createAnimation(
  ANIMATION_STEPS,
  (tl) => {
    if (tl.reversed()) {
      tl.reverse();
      tl.pause();
      showPlayButton();
      toggleDisableButton(reverseButton, true);
      toggleDisableButton(playButton, false);
      toggleDisableButton(restartButton, true);
    }
  },
  (step) => {
    updateBattleTime(step);
  },
  () => {
    endHandler();
  },
  (tl) => {
    const steps = ANIMATION_STEPS.length;
    const percentage =
      (steps / (steps - 1)) * (100 * tl.progress() - 100 * (1 / steps));
    updateProgress(percentage);
  }
);

function populateUnitLists(germanList, finnishList) {
  createUnitSvg(germanList, {
    id: "",
    type: UNIT_TYPES.mountainInfantry,
    affiliation: AFFILIATION.German,
    echelon: ECHELON.regiment,
    unitName: "218",
  });
  createUnitSvg(germanList, {
    id: "",
    type: UNIT_TYPES.mountainInfantry,
    affiliation: AFFILIATION.German,
    echelon: ECHELON.battalion,
    unitName: "I",
    parentName: "218",
  });
  createUnitSvg(germanList, {
    id: "",
    type: UNIT_TYPES.mountainInfantry,
    affiliation: AFFILIATION.German,
    echelon: ECHELON.battalion,
    unitName: "II",
    parentName: "218",
  });
  createUnitSvg(germanList, {
    id: "",
    type: UNIT_TYPES.mountainInfantry,
    affiliation: AFFILIATION.German,
    echelon: ECHELON.battalion,
    unitName: "III",
    parentName: "218",
  });
  createUnitSvg(germanList, {
    id: "",
    type: UNIT_TYPES.mountainInfantry,
    affiliation: AFFILIATION.German,
    echelon: ECHELON.company,
    unitName: "16",
    parentName: "218",
  });

  createUnitSvg(finnishList, {
    id: "",
    type: UNIT_TYPES.infantry,
    affiliation: AFFILIATION.Finnish,
    echelon: ECHELON.battalion,
    unitName: "JP2",
  });
  createUnitSvg(finnishList, {
    id: "",
    type: UNIT_TYPES.infantry,
    affiliation: AFFILIATION.Finnish,
    echelon: ECHELON.battalion,
    unitName: "JP3",
  });
  createUnitSvg(finnishList, {
    id: "",
    type: UNIT_TYPES.infantry,
    affiliation: AFFILIATION.Finnish,
    echelon: ECHELON.battalion,
    unitName: "JP4",
  });
  createUnitSvg(finnishList, {
    id: "",
    type: UNIT_TYPES.infantry,
    affiliation: AFFILIATION.Finnish,
    echelon: ECHELON.battalion,
    unitName: "JP5",
  });
}

function playHandler() {
  if (tl.reversed()) {
    tl.reverse();
  }
  if (tl.paused()) {
    tl.resume();
  } else {
    tl.play();
  }
  toggleDisableButton(reverseButton, false);
  toggleDisableButton(restartButton, false);
  showPauseButton();
  playButton.blur();
}

function pauseHandler() {
  showPlayButton();
  if (!tl.paused()) tl.pause();
  pauseButton.blur();
}

function restartHandler() {
  tl.pause().seek("step-1").resume();
  if (tl.reversed()) {
    tl.reverse();
  }
  toggleDisableButton(playButton, false);
  showPauseButton();
  restartButton.blur();
}

function reverseHandler() {
  tl.reverse();
  showPauseButton();
  toggleDisableButton(playButton, false);
  reverseButton.blur();
}

function endHandler() {
  showPlayButton();
  toggleDisableButton(playButton, true);
}

function toggleDisableButton(button, isDisabled) {
  button.disabled = isDisabled;
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

function updateProgress(percentage) {
  progress.value = percentage;
}
