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
// const tl = gsap.timeline();

// const jp3 = document.getElementById("jp3");
// tl.to(jp3, { duration: 10, x: 0, y: -250 }).to(jp3, {
//   duration: 3,
//   x: 30,
//   y: -350,
// });
