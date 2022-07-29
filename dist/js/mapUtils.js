import { UNIT_TYPES, AFFILIATION, ECHELON } from "./constants.js";

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

function createUnitSvg(
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
    company: "I I I",
    battalion: "I I",
    regiment: "I",
  };

  const echelonSymbol = echelonSymbols[echelon];

  if (type === UNIT_TYPES.infantry) {
    return `<svg id="${id}" x="0" y="0" class="${affiliation.toLowerCase()} unit-symbol" stroke-linecap="round" stroke-linejoin="round" fill-rule="evenodd" width="140" viewBox="0 0 5000 3000"><defs><style type="text/css">
  .ss0 {fill:gray;stroke:gray;stroke-width:40;}
  .ps0 {fill:none;stroke:gray;stroke-width:26;}
  .ss1 {fill:red;stroke:black;stroke-width:40;}
  .ps1 {fill:none;stroke:black;stroke-width:26;}
  .ts0 {font-family:Arial;font-size:2517px;font-weight:bold;fill:gray;text-anchor:middle;}
  .ts1 {font-family:Arial;font-size:2517px;font-weight:bold;fill:black;text-anchor:middle;}
  .ts2 {font-family:Arial;fill:black;text-anchor:end;}
  .ts3 {font-family:Arial;fill:black;}</style>
  <mask id="cr0" maskUnits="userSpaceOnUse" x="0" y="0" width="5000" height="3000" fill-rule="nonzero"><use xlink:href="#cp0" fill="white"/></mask><mask id="cr1" maskUnits="userSpaceOnUse" x="0" y="0" width="5000" height="3000" fill-rule="nonzero"><use xlink:href="#cp1" fill="white"/></mask><polygon id="cp0" points="1367,1147 3645,1147 3645,2680 1367,2680" shape-rendering="crispEdges"/><polygon id="cp1" points="1327,1107 3605,1107 3605,2639 1327,2639" shape-rendering="crispEdges"/></defs><g transform="matrix(1.52398 0 0 1.52418 1367.14 1152.6)"><rect x="0" y="0" width="1500" height="1000" class="ss0"/></g><g transform="matrix(0.201613 0 0 0.201626 1367.14 340.65)"><text x="5673" y="3514" class="ts0">${echelonSymbol}</text></g><g mask="url(#cr0)"><g transform="matrix(1.52398 0 0 1.52418 1367.14 1152.6)"><polyline points="0,0 1500,1000" class="ps0"/><polyline points="1500,0 0,1000" class="ps0"/></g></g><g transform="matrix(1.52398 0 0 1.52418 1326.81 1112.27)"><rect x="0" y="0" width="1500" height="1000" class="ss1"/></g><g transform="matrix(0.201613 0 0 0.201626 1326.81 300.325)"><text x="5673" y="3514" class="ts1">${echelonSymbol}</text></g><g mask="url(#cr1)"><g transform="matrix(1.52398 0 0 1.52418 1326.81 1112.27)"><polyline points="0,0 1500,1000" class="ps1"/><polyline points="1500,0 0,1000" class="ps1"/></g></g><g transform="matrix(20.1613 0 0 20.1626 0 260)"><text x="56" y="112" class="ts2">${unitName}</text><text x="189" y="112" class="ts3">${parentName}</text></g></svg>`;
  }
}
