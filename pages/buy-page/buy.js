const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const main = document.querySelector(".main"); // Target main-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  main.classList.toggle("main-blur"); // Add blur effect to the main
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});
