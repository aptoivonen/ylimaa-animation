import {
  STEP_DURATION,
  EASE,
  X_MAP_OFFSET,
  Y_MAP_OFFSET,
} from "./constants.js";

export function createAnimation(
  animationArr,
  stepCallback = Function.prototype,
  animationEndCallback = Function.prototype
) {
  const tl = gsap.timeline({
    defaults: {
      duration: STEP_DURATION,
      ease: EASE,
      svgOrigin: "left top",
    },
  });

  animationArr.forEach((animationEntry, index) => {
    createAnimationStep(animationEntry, index, stepCallback, tl);
  });

  animationEnd(animationEndCallback, tl);
  return tl;
}

function createAnimationStep(data, step, stepCallback, tl) {
  Object.entries(data).forEach(([unitId, animationVars]) => {
    const unitSelector = "#" + unitId;
    let rect;
    let attr;
    if ("x" in animationVars || "y" in animationVars) {
      attr = {};
      rect = document.querySelector(unitSelector).getBoundingClientRect();
    }
    if ("x" in animationVars) {
      attr.x = animationVars.x - Math.floor(rect.width / 2) + X_MAP_OFFSET;
      const { x, ...newVars } = animationVars;
      animationVars = newVars;
    }
    if ("y" in animationVars) {
      attr.y = animationVars.y - Math.floor(rect.height / 2) + Y_MAP_OFFSET;
      const { y, ...newVars } = animationVars;
      animationVars = newVars;
    }
    if (attr) {
      animationVars.attr = attr;
    }
    tl.to(unitSelector, animationVars, `step-${step}`);
  });
  // empty step? create a null step
  if (Object.keys(data).length === 0) {
    tl.to({}, {}, `step-${step}`);
  }
  // first step? set up units
  if (step === 0) {
    setupComplete(tl);
  }
  updateStep(step, stepCallback, tl);
}

function setupComplete(tl) {
  tl.call(() => {
    if (tl.reversed()) {
      tl.reverse();
      tl.pause();
    }
  });
}

function updateStep(step, stepCallback, tl) {
  tl.call(stepCallback(step));
}

function animationEnd(animationEndCallback, tl) {
  tl.pause("step-1");
  tl.call(animationEndCallback);
}
