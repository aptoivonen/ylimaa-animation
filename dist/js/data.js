import { UNIT_TYPES, AFFILIATION, ECHELON } from "./constants.js";

export const UNITS = [
  {
    id: "jp2",
    type: UNIT_TYPES.infantry,
    affiliation: AFFILIATION.Finnish,
    echelon: ECHELON.battalion,
    unitName: "JP2",
  },
  {
    id: "jp3",
    type: UNIT_TYPES.infantry,
    affiliation: AFFILIATION.Finnish,
    echelon: ECHELON.battalion,
    unitName: "JP3",
  },
  {
    id: "jp4",
    type: UNIT_TYPES.infantry,
    affiliation: AFFILIATION.Finnish,
    echelon: ECHELON.battalion,
    unitName: "JP4",
  },
  {
    id: "jp5",
    type: UNIT_TYPES.infantry,
    affiliation: AFFILIATION.Finnish,
    echelon: ECHELON.battalion,
    unitName: "JP5",
  },
];

// prettier-ignore
export const ANIMATION_STEPS = [
  {
    jp2: { x: 340, y: 970, opacity: 0 },
    jp3: { x: 350, y: 1033 },
    jp4: { x: 360, y: 900, opacity: 0 },
    jp5: { x: 1130, y: 1080 },
    // ghq218: { x: 770, y: 350 },
    // ghq218I: { x: 790, y: 570 },
    // ghq218II: { x: 630, y: 210 },
    // g218I: { x: 800, y: 730 },
    // g218II: { x: 560, y: 196 },
    // g218III: { x: 1190, y: 910 },
    // gII8: { x: 167, y: 465 },
    // g21816: { x: 1080, y: 970 },
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
  // { jp2: { x: 583, y: 717 }, jp3: { x: 338, y: 518 }, gII8: { x: 272, y: 480 }, },
  // { jp2: { x: 619, y: 690 }, jp3: { x: 353, y: 495 }, gII8: { x: 205, y: 467 }, },
  // { jp3: { x: 344, y: 542 }, g218I: { x: 689, y: 721 } }, // 7.10 klo 18
  // { jp2: { x: 549, y: 662 }, jp3: { x: 341, y: 593 }, g218I: { x: 800, y: 730 }, },
  { jp2: { x: 518, y: 686 } },
  {},
  {},
  {}, // 7.10 klo 23
];