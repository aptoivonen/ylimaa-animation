// Add new units here
const UNITS = [
  { id: "ghq218", data: "svg/hq-218.svg" },
  { id: "ghq218II", data: "svg/hq-218-II.svg" },
  { id: "g218I", data: "svg/218-I.svg" },
  { id: "g218II", data: "svg/218-II.svg" },
  { id: "g218III", data: "svg/218-III.svg" },
  { id: "gII8", data: "svg/II-8.svg" },
  { id: "g21816", data: "svg/218-16.svg" },
  { id: "jp2", data: "svg/jp2.svg" },
  { id: "jp3", data: "svg/jp3.svg" },
  { id: "jp4", data: "svg/jp4.svg" },
  { id: "jp5", data: "svg/jp5.svg" },
];

function populateWithUnits() {
  // Populate map with units
  const map = document.getElementById("map");
  // Required by foreignObject creation
  const ns = "http://www.w3.org/2000/svg";

  UNITS.forEach((unit) => {
    const newUnitElement = document.createElementNS(ns, "foreignObject");
    newUnitElement.setAttribute("class", "symbol-wrapper");
    // newUnitElement.setAttribute("x", unit.x);
    // newUnitElement.setAttribute("y", unit.y);
    newUnitElement.setAttribute("x", 0);
    newUnitElement.setAttribute("y", 0);
    const obj = document.createElement("object");
    obj.className = "unit-symbol";
    obj.id = unit.id;
    obj.data = unit.data;
    obj.type = "image/svg+xml";
    newUnitElement.appendChild(obj);
    map.appendChild(newUnitElement);
  });
}

populateWithUnits();

// Animation
const STEP_DURATION = 1;
const EASE = "none";
const START_DATE_STRING = "October 7, 1944 06:00:00";
const xOffset = -25;
const yOffset = -3;

const animationSteps = [
  {
    jp2: { x: 340, y: 970, opacity: 0 },
    jp3: { x: 350, y: 1033 },
    jp4: { x: 360, y: 900, opacity: 0 },
    jp5: { x: 1130, y: 1080 },
    ghq218: { x: 770, y: 350 },
    ghq218II: { x: 630, y: 210 },
    g218I: { x: 800, y: 730 },
    g218II: { x: 560, y: 196 },
    g218III: { x: 1190, y: 910 },
    gII8: { x: 180, y: 491 },
    g21816: { x: 1080, y: 970 },
  }, // set up
  { jp3: { x: 340, y: 990 } },
  { jp3: { x: 366, y: 935 } },
  { jp3: { x: 360, y: 900 } },
  { jp3: { x: 380, y: 860 } },
  { jp2: { opacity: 1 } },
  { jp2: { x: 366, y: 926 }, jp3: { x: 342, y: 755 } }, // 7.10 klo 12
  { jp2: { x: 375, y: 890 }, jp3: { x: 289, y: 662 } },
  { jp2: { x: 523, y: 770 }, jp3: { x: 331, y: 587 } },
  { jp2: { x: 538, y: 751 }, jp3: { x: 353, y: 557 } },
  { jp2: { x: 583, y: 717 }, jp3: { x: 338, y: 518 } },
  { jp2: { x: 619, y: 690 }, jp3: { x: 353, y: 495 } },
  { jp3: { x: 344, y: 542 }, g218I: { x: 689, y: 721 } }, // 7.10 klo 18
  {
    jp2: { x: 549, y: 662 },
    jp3: { x: 341, y: 593 },
    g218I: { x: 800, y: 730 },
  },
  { jp2: { x: 518, y: 686 } },
  {},
  {},
  {}, // 7.10 klo 23
];

const tl = createAnimation(animationSteps);

function createAnimation(animationArr) {
  const tl = gsap.timeline({
    defaults: { duration: STEP_DURATION, ease: EASE },
  });

  animationArr.forEach((animationEntry, index) => {
    createAnimationStep(animationEntry, index, tl);
  });

  animationEnd(tl);
  return tl;
}

function createAnimationStep(data, step, tl) {
  Object.entries(data).forEach(([unitId, animationVars]) => {
    const unitSelector = "#" + unitId;
    let rect;
    if ("x" in animationVars || "y" in animationVars) {
      rect = document.querySelector(unitSelector).getBoundingClientRect();
    }
    if ("x" in animationVars) {
      animationVars.x = animationVars.x - Math.floor(rect.width / 2) + xOffset;
    }
    if ("y" in animationVars) {
      animationVars.y = animationVars.y - Math.floor(rect.height / 2) + yOffset;
    }
    tl.to(unitSelector, animationVars, `step-${step}`);
  });
  // empty step? create a null step
  if (Object.keys(data).length === 0) {
    tl.to("body", {}, `step-${step}`);
  }
  // first step? set up units
  if (step === 0) {
    setupComplete(tl);
  }
  updateStep(step, tl);
}

function setupComplete(tl) {
  tl.call(() => {
    if (tl.reversed()) {
      tl.reverse();
      tl.pause();
    }
  });
}

function updateStep(step, tl) {
  tl.call(() => {
    updateBattleTime(step);
  });
}

function animationEnd(tl) {
  tl.pause("step-1");
  tl.call(() => {
    endHandler();
  });
}

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

updateBattleTime(0);
