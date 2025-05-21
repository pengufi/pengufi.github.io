document.addEventListener('DOMContentLoaded', () => {
  // Blog Slider Auto-Scroll (Right to Left)
  const slider = document.querySelector('.blog-slider');
  let scrollAmount = slider ? slider.scrollWidth : 0;

  function autoSlideBlog() {
    if (slider) {
      scrollAmount -= 2;
      slider.scrollLeft = scrollAmount;
      if (scrollAmount <= 0) {
        scrollAmount = slider.scrollWidth;
        slider.scrollLeft = scrollAmount;
      }
    }
  }

  setInterval(autoSlideBlog, 50);

  // Gallery Carousel (Right to Left, showing full images)
  const track = document.querySelector('.gallery-track');
  const slides = track ? track.querySelectorAll('.gallery-slide') : [];
  let index = 0;

  function autoSlideGallery() {
    if (track && slides.length > 0) {
      index = (index + 1) % slides.length; // Move to next slide
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  setInterval(autoSlideGallery, 3500); // Change slide every 3.5 seconds

  // Scroll Animation
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.fade-in').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  });
});