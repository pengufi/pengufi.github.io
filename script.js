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

  // Gallery Carousel (Right to Left, same animation as Blog Slider)
  const track = document.querySelector('.gallery-track');
  let galleryScrollAmount = track ? track.scrollWidth : 0;

  function autoSlideGallery() {
    if (track) {
      galleryScrollAmount -= 2;
      track.scrollLeft = galleryScrollAmount;
      if (galleryScrollAmount <= 0) {
        galleryScrollAmount = track.scrollWidth;
        track.scrollLeft = galleryScrollAmount;
      }
    }
  }

  setInterval(autoSlideGallery, 50);

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