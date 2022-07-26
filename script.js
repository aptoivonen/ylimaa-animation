const jp3 = document.getElementById("symbol-jp3");

const tl = gsap.timeline();

tl.to(jp3, { duration: 3, x: -50, y: -50 })
  .to(jp3, { duration: 3, x: 0, y: -100 })
  .to(jp3, { duration: 3, x: 30, y: -130 })
  .to(jp3, { duration: 3, x: 45, y: -160 });
