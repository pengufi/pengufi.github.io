document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.blog-slider');
  const cards = slider ? slider.querySelectorAll('.card') : [];
  const dots = document.querySelectorAll('.dot');
  let blogIndex = 0;

  if (slider && cards.length > 0) {
    function autoSlideBlog() {
      blogIndex = (blogIndex + 1) % cards.length;
      const cardWidth = cards[0].offsetWidth + 20;
      slider.scrollTo({ left: blogIndex * cardWidth, behavior: 'smooth' });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === blogIndex);
      });
    }

    setInterval(autoSlideBlog, 3500);

    slider.addEventListener('scroll', () => {
      const scrollPos = slider.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 20;
      const activeIndex = Math.round(scrollPos / cardWidth);
      blogIndex = activeIndex;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        blogIndex = i;
        const cardWidth = cards[0].offsetWidth + 20;
        slider.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
      });
    });

    let isDragging = false;
    let startX;

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseup', (e) => {
      if (isDragging) {
        const deltaX = e.pageX - startX;
        if (Math.abs(deltaX) > 50) {
          const cardWidth = cards[0].offsetWidth + 20;
          const currentIndex = Math.round(slider.scrollLeft / cardWidth);
          const newIndex = deltaX > 0 ? Math.max(currentIndex - 1, 0) : Math.min(currentIndex + 1, cards.length - 1);
          blogIndex = newIndex;
          slider.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
        }
      }
      isDragging = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseleave', () => {
      isDragging = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
    });

    slider.addEventListener('touchend', (e) => {
      if (isDragging) {
        const deltaX = e.changedTouches[0].pageX - startX;
        if (Math.abs(deltaX) > 50) {
          const cardWidth = cards[0].offsetWidth + 20;
          const currentIndex = Math.round(slider.scrollLeft / cardWidth);
          const newIndex = deltaX > 0 ? Math.max(currentIndex - 1, 0) : Math.min(currentIndex + 1, cards.length - 1);
          blogIndex = newIndex;
          slider.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
        }
      }
      isDragging = false;
    });

    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });
  }

  const track = document.querySelector('.gallery-track');
  const slides = track ? track.querySelectorAll('.gallery-slide') : [];
  let index = 0;

  function autoSlideGallery() {
    if (track && slides.length > 0) {
      index = (index + 1) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  setInterval(autoSlideGallery, 3500);

  if (track) {
    let isDragging = false;
    let startX;

    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
    });

    track.addEventListener('mouseup', (e) => {
      if (isDragging) {
        const deltaX = e.pageX - startX;
        if (Math.abs(deltaX) > 50) {
          index = deltaX > 0 ? Math.max(index - 1, 0) : Math.min(index + 1, track.children.length - 1);
          track.style.transform = `translateX(-${index * 100}%)`;
        }
      }
      isDragging = false;
    });

    track.addEventListener('mouseleave', () => {
      isDragging = false;
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    track.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
    });

    track.addEventListener('touchend', (e) => {
      if (isDragging) {
        const deltaX = e.changedTouches[0].pageX - startX;
        if (Math.abs(deltaX) > 50) {
          index = deltaX > 0 ? Math.max(index - 1, 0) : Math.min(index + 1, track.children.length - 1);
          track.style.transform = `translateX(-${index * 100}%)`;
        }
      }
      isDragging = false;
    });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });
  }
});