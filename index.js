// JavaScript to handle the carousel navigation

const carouselTrack = document.querySelector('.carousel-track');
let scrollAmount = 0;

// Function to scroll the carousel left or right
function scrollCarousel(direction) {
  const itemWidth = document.querySelector('.carousel-item').offsetWidth + 20; // Including gap
  if (direction === 'right') {
    scrollAmount += itemWidth;
    carouselTrack.style.transform = `translateX(-${scrollAmount}px)`;
  } else {
    scrollAmount -= itemWidth;
    carouselTrack.style.transform = `translateX(-${scrollAmount}px)`;
  }

  // Prevent over-scrolling
  if (scrollAmount < 0) scrollAmount = 0;
  const maxScroll = carouselTrack.scrollWidth - carouselTrack.offsetWidth;
  if (scrollAmount > maxScroll) scrollAmount = maxScroll;
  carouselTrack.style.transform = `translateX(-${scrollAmount}px)`;
}
