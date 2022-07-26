const jp3 = document.getElementById("jp3");

const tl = gsap.timeline();

tl.to(jp3, { duration: 10, x: 0, y: -250 }).to(jp3, {
  duration: 3,
  x: 30,
  y: -350,
});
