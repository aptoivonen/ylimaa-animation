const jp3up = document.getElementById("symbol-jp3up");

const tl = gsap.timeline();

tl.to(jp3up, { duration: 3, x: -50, y: -50 })
  .to(jp3up, { duration: 3, x: 0, y: -100 })
  .to(jp3up, { duration: 3, x: 30, y: -130 })
  .to(jp3up, { duration: 3, x: 45, y: -160 });
