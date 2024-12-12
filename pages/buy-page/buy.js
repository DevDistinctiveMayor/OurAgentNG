const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});
const cancelButton = document.getElementById('cancelFilter');
const toggleButton = document.getElementById('toggleFilter');
const filterContainer = document.querySelector('.advance-filter-container');
const body = document.body;

toggleButton.addEventListener('click', () => {
  filterContainer.classList.toggle('show'); // Toggles the "show" class
  body.classList.toggle('overlay-active'); // Prevents body scrolling
});

cancelButton.addEventListener('click', () => {
  filterContainer.classList.remove('show'); // Hide filter container
  body.classList.remove('overlay-active'); // Enable body scrolling
});


