// Simple carousel functionality for Zen Browser previews
let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");
const slideCount = slides.length;

// Initialize carousel
function initCarousel() {
  updateCarousel();
  adjustCarouselSize();

  // Add window resize listener to adjust carousel size
  window.addEventListener("resize", adjustCarouselSize);
}

// Update carousel display based on current index
function updateCarousel() {
  // Update slides container position
  const slidesContainer = document.querySelector(".carousel-slides");
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Adjust carousel size to fit content (images or video)
function adjustCarouselSize() {
  const currentSlide = slides[currentIndex];
  const img = currentSlide.querySelector("img");
  const video = currentSlide.querySelector("iframe");

  if (video) {
    // Handle video iframe
    updateCarouselDimensionsForVideo();
  } else if (img && img.complete) {
    updateCarouselDimensions(img);
  } else if (img) {
    img.onload = () => updateCarouselDimensions(img);
  }
}

function updateCarouselDimensionsForVideo() {
  const container = document.querySelector(".carousel-container");
  const aspectRatio = 16 / 9; // Standard YouTube aspect ratio

  // Set max dimensions while preserving 16:9 aspect ratio
  const maxWidth = Math.min(window.innerWidth * 0.8, 1280);
  const maxHeight = Math.min(window.innerHeight * 0.7, 720);

  // Determine dimensions based on constraints
  let width, height;
  if (maxWidth / aspectRatio <= maxHeight) {
    width = maxWidth;
    height = maxWidth / aspectRatio;
  } else {
    height = maxHeight;
    width = height * aspectRatio;
  }

  // Apply dimensions to container
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
}

function updateCarouselDimensions(img) {
  const container = document.querySelector(".carousel-container");
  const aspectRatio = img.naturalWidth / img.naturalHeight;

  // Set max dimensions while preserving aspect ratio
  const maxWidth = Math.min(window.innerWidth * 0.8, img.naturalWidth);
  const maxHeight = Math.min(window.innerHeight * 0.7, img.naturalHeight);

  // Determine dimensions based on constraints
  let width, height;
  if (maxWidth / aspectRatio <= maxHeight) {
    width = maxWidth;
    height = maxWidth / aspectRatio;
  } else {
    height = maxHeight;
    width = height * aspectRatio;
  }

  // Apply dimensions to container
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
}

// Move slide in a direction
function moveSlide(direction) {
  currentIndex = (currentIndex + direction + slideCount) % slideCount;
  updateCarousel();
  adjustCarouselSize();
}

// Initialize the carousel when the page loads
window.addEventListener("DOMContentLoaded", initCarousel);

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    moveSlide(-1);
  } else if (e.key === "ArrowRight") {
    moveSlide(1);
  }
});

// Add touch/swipe support
const carouselSlides = document.querySelector(".carousel-slides");
let touchStartX = 0;
let touchEndX = 0;

carouselSlides.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carouselSlides.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX) {
    moveSlide(1); // Swipe left, go to next slide
  } else if (touchEndX > touchStartX) {
    moveSlide(-1); // Swipe right, go to previous slide
  }
}
