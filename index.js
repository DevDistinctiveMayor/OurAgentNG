const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;
let autoSlideInterval;

// Scroll the carousel left or right
function scrollCarousel(direction) {
  const visibleItems = getVisibleItems();
  const totalItems = carouselItems.length;

  if (direction === "right") {
    currentIndex = (currentIndex + 1) % totalItems; // Circular navigation
  } else if (direction === "left") {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  }

  const itemWidth = carouselItems[0].offsetWidth + 20; // Include gap
  const newScrollPosition = currentIndex * itemWidth;

  carouselTrack.style.transform = `translateX(-${newScrollPosition}px)`;
  resetAutoSlide(); // Restart auto-slide after manual navigation
}

// Get the number of visible items based on screen size
function getVisibleItems() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) return 1; // Mobile
  if (screenWidth <= 1024) return 2; // Tablet
  return 4; // Desktop
}

// Start auto-slide
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    scrollCarousel("right");
  }, 3000); // 3 seconds
}

// Stop auto-slide
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Restart auto-slide after manual navigation
function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Recalculate position on window resize
window.addEventListener("resize", () => {
  const itemWidth = carouselItems[0].offsetWidth + 20; // Include gap
  const newScrollPosition = currentIndex * itemWidth;
  carouselTrack.style.transform = `translateX(-${newScrollPosition}px)`;
});

// Start auto-slide on page load
startAutoSlide();
