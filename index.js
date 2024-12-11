const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = Array.from(document.querySelectorAll(".carousel-item"));
let currentIndex = 0;
let autoSlideInterval;
let itemWidth;

// Clone the first and last few items for seamless infinite scrolling
const clonesAtStart = carouselItems.slice(-4).map((item) => item.cloneNode(true));
const clonesAtEnd = carouselItems.slice(0, 4).map((item) => item.cloneNode(true));

clonesAtStart.forEach((clone) => carouselTrack.prepend(clone));
clonesAtEnd.forEach((clone) => carouselTrack.append(clone));

// Update carousel items after cloning
const allItems = Array.from(carouselTrack.children);
const totalItems = allItems.length;

// Function to update item width dynamically
function updateItemWidth() {
  itemWidth = carouselItems[0].offsetWidth + 20; // Include gap
  carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

updateItemWidth();

// Scroll carousel function
function scrollCarousel(direction = "right") {
  if (direction === "right") {
    currentIndex++;
  } else if (direction === "left") {
    currentIndex--;
  }

  carouselTrack.style.transition = "transform 0.5s ease-in-out";
  carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Handle infinite scroll
  setTimeout(() => {
    if (currentIndex >= totalItems - 4) {
      currentIndex = 4;
      carouselTrack.style.transition = "none";
      carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    } else if (currentIndex < 4) {
      currentIndex = totalItems - 8;
      carouselTrack.style.transition = "none";
      carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, 500);
}

// Auto-slide function
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    scrollCarousel("right");
  }, 3000); // Every 3 seconds
}

// Stop auto-slide function
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Recalculate item width on window resize
window.addEventListener("resize", () => {
  updateItemWidth();
});

// Start auto-slide on page load
startAutoSlide();

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});
