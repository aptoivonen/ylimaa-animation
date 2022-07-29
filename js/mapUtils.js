import { UNIT_TYPES, SVG_WIDTH } from "./constants.js";

const ns = "http://www.w3.org/2000/svg";

export function populateWithUnits(mapElement, units) {
  units.forEach((unit) => {
    createUnitSvg(mapElement, {
      id: unit.id,
      type: unit.type,
      affiliation: unit.affiliation,
      echelon: unit.echelon,
      unitName: unit.unitName,
      parentName: unit.parentName,
    });
  });
}

export function createUnitSvg(
  mapElement,
  { id, type, affiliation, echelon, unitName = "", parentName = "" } = {}
) {
  const newSvg = document.createElementNS(ns, "svg");
  mapElement.appendChild(newSvg);
  newSvg.outerHTML = createSvgString({
    id,
    type,
    affiliation,
    echelon,
    unitName,
    parentName,
  });
}

function createSvgString({
  id,
  type,
  affiliation,
  echelon,
  unitName = "",
  parentName = "",
} = {}) {
  const echelonSymbols = {
    company: "I",
    battalion: "I I",
    regiment: "I I I",
  };

  const echelonSymbol = echelonSymbols[echelon];

  if (type === UNIT_TYPES.infantry) {
    return `<svg id="${id}" x="0" y="0" class="${affiliation.toLowerCase()} unit-symbol" stroke-linecap="round" stroke-linejoin="round" fill-rule="evenodd" width="${SVG_WIDTH}" viewBox="0 0 5000 3000"><defs>
  <mask id="cr0" maskUnits="userSpaceOnUse" x="0" y="0" width="5000" height="3000" fill-rule="nonzero"><use xlink:href="#cp0" fill="white"/></mask><mask id="cr1" maskUnits="userSpaceOnUse" x="0" y="0" width="5000" height="3000" fill-rule="nonzero"><use xlink:href="#cp1" fill="white"/></mask><polygon id="cp0" points="1367,1147 3645,1147 3645,2680 1367,2680" shape-rendering="crispEdges"/><polygon id="cp1" points="1327,1107 3605,1107 3605,2639 1327,2639" shape-rendering="crispEdges"/></defs><g transform="matrix(1.52398 0 0 1.52418 1367.14 1152.6)"><rect x="0" y="0" width="1500" height="1000" class="ss0"/></g><g transform="matrix(0.201613 0 0 0.201626 1367.14 340.65)"><text x="5673" y="3514" class="ts0">${echelonSymbol}</text></g><g mask="url(#cr0)"><g transform="matrix(1.52398 0 0 1.52418 1367.14 1152.6)"><polyline points="0,0 1500,1000" class="ps0"/><polyline points="1500,0 0,1000" class="ps0"/></g></g><g transform="matrix(1.52398 0 0 1.52418 1326.81 1112.27)"><rect x="0" y="0" width="1500" height="1000" class="ss1"/></g><g transform="matrix(0.201613 0 0 0.201626 1326.81 300.325)"><text x="5673" y="3514" class="ts1">${echelonSymbol}</text></g><g mask="url(#cr1)"><g transform="matrix(1.52398 0 0 1.52418 1326.81 1112.27)"><polyline points="0,0 1500,1000" class="ps1"/><polyline points="1500,0 0,1000" class="ps1"/></g></g><g transform="matrix(20.1613 0 0 20.1626 0 260)"><text x="56" y="112" class="ts2">${unitName}</text><text x="189" y="112" class="ts3">${parentName}</text></g></svg>`;
  }

  if (type === UNIT_TYPES.mountainInfantry) {
    return `<svg id="${id}" x="0" y="0" class="${affiliation.toLowerCase()} mountain-infantry unit-symbol" stroke-linecap="round" stroke-linejoin="round" fill-rule="evenodd" width="${SVG_WIDTH}" viewBox="0 0 5000 3000"><mask id="cr0" maskUnits="userSpaceOnUse" x="0" y="0" width="5000" height="3000" fill-rule="nonzero"><use xlink:href="#cp0" fill="white"/></mask><mask id="cr1" maskUnits="userSpaceOnUse" x="0" y="0" width="5000" height="3000" fill-rule="nonzero"><use xlink:href="#cp1" fill="white"/></mask><polygon id="cp0" points="1367,1147 3645,1147 3645,2680 1367,2680" shape-rendering="crispEdges"/><polygon id="cp1" points="1327,1107 3605,1107 3605,2639 1327,2639" shape-rendering="crispEdges"/></defs><g transform="matrix(1.52398 0 0 1.52418 1367.14 1152.6)"><rect x="0" y="0" width="1500" height="1000" class="ss0"/></g><g transform="matrix(0.201613 0 0 0.201626 1367.14 340.65)"><text x="5673" y="3514" class="ts0">${echelonSymbol}</text></g><g mask="url(#cr0)"><g transform="matrix(1.52398 0 0 1.52418 1367.14 1152.6)"><polygon points="578,908 922,908 750,574" class="bs0"/><polyline points="0,1 1500,1000" class="ps0"/><polyline points="1500,1 0,1000" class="ps0"/></g></g><g transform="matrix(1.52398 0 0 1.52418 1326.81 1112.27)"><rect x="0" y="0" width="1500" height="1000" class="ss1"/></g><g transform="matrix(0.201613 0 0 0.201626 1326.81 300.325)"><text x="5673" y="3514" class="ts1">${echelonSymbol}</text></g><g mask="url(#cr1)"><g transform="matrix(1.52398 0 0 1.52418 1326.81 1112.27)"><polygon points="578,908 922,908 750,574" class="bs1"/><polyline points="0,1 1500,1000" class="ps1"/><polyline points="1500,1 0,1000" class="ps1"/></g></g><g transform="matrix(20.1613 0 0 20.1626 0 260)"><text x="56" y="112" class="ts2">${unitName}</text><text x="189" y="112" class="ts3">${parentName}</text></g></svg>`;
  }

  if (type === UNIT_TYPES.mountainInfantryHq) {
    return `<svg id="${id}" x="0" y="0" class="${affiliation.toLowerCase()} mountain-infantry-hq unit-symbol" stroke-linecap="round" stroke-linejoin="round" fill-rule="evenodd" width="${SVG_WIDTH}" viewBox="0 0 5000 3000"><mask id="cr0" maskUnits="userSpaceOnUse" x="0" y="0" width="5000" height="3000" fill-rule="nonzero"><use xlink:href="#cp0" fill="white"/></mask><mask id="cr1" maskUnits="userSpaceOnUse" x="0" y="0" width="5000" height="3000" fill-rule="nonzero"><use xlink:href="#cp1" fill="white"/></mask><polygon id="cp0" points="1451,663 3160,663 3160,1809 1451,1809" shape-rendering="crispEdges"/><polygon id="cp1" points="1421,633 3130,633 3130,1779 1421,1779" shape-rendering="crispEdges"/></defs><g transform="matrix(1.14306 0 0 1.13961 1451.27 667.387)"><rect x="0" y="0" width="1500" height="1000" class="ss0"/></g><g transform="matrix(0.15122 0 0 0.150754 1451.27 60.3015)"><text x="5673" y="3514" class="ts0">${echelonSymbol}</text></g><g mask="url(#cr0)"><g transform="matrix(1.14306 0 0 1.13961 1451.27 667.387)"><polygon points="578,908 922,908 750,574" class="bs0"/><polyline points="0,1 1500,1000" class="ps0"/><polyline points="1500,1 0,1000" class="ps0"/></g></g><g transform="matrix(0.15122 0 0 0.150754 970.244 30.1508)"><polyline points="3181,11800 3181,19400" class="ps1"/></g><g transform="matrix(1.14306 0 0 1.13961 1421.03 637.236)"><rect x="0" y="0" width="1500" height="1000" class="ss1"/></g><g transform="matrix(0.15122 0 0 0.150754 1421.03 30.1508)"><text x="5673" y="3514" class="ts1">${echelonSymbol}</text></g><g mask="url(#cr1)"><g transform="matrix(1.14306 0 0 1.13961 1421.03 637.236)"><polygon points="578,908 922,908 750,574" class="bs1"/><polyline points="0,1 1500,1000" class="ps2"/><polyline points="1500,1 0,1000" class="ps2"/></g></g><g transform="matrix(0.15122 0 0 0.150754 940 0)"><polyline points="3181,11800 3181,19400" class="ps3"/></g><g transform="matrix(15.122 0 0 15.0754 940 0)"><text x="22" y="112" class="ts2">${unitName}</text><text x="155" y="112" class="ts3">${parentName}</text></g></svg>`;
  }
}
