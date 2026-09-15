const gallery = document.getElementById('gallery');

function updateScrollHint() {
  const atEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 5;
  gallery.classList.toggle('at-end', atEnd);
}

if (gallery) {
  gallery.addEventListener('scroll', updateScrollHint);
  window.addEventListener('resize', updateScrollHint);
  updateScrollHint();

  // Let a normal mouse wheel (vertical scroll) move the gallery horizontally.
  gallery.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      gallery.scrollLeft += e.deltaY * 3;
    }
  }, { passive: false });

  // Click-and-drag scrolling for desktop mouse users.
  let isDown = false;
  let startX;
  let scrollStart;
  let dragged = false;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    dragged = false;
    gallery.classList.add('dragging');
    startX = e.pageX;
    scrollStart = gallery.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    gallery.classList.remove('dragging');
  });

  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.classList.remove('dragging');
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const delta = e.pageX - startX;
    if (Math.abs(delta) > 5) dragged = true;
    gallery.scrollLeft = scrollStart - delta;
  });

  // If the mouse moved enough to count as a drag, cancel the link click that follows.
  gallery.addEventListener('click', (e) => {
    if (dragged) {
      e.preventDefault();
      dragged = false;
    }
  }, true);
}

// Slideshow (PowerPoint-style) logic — only runs if a .slideshow exists on the page.
const slideTrack = document.querySelector('.slide-track');

if (slideTrack) {
  const slides = Array.from(slideTrack.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.slide-dots');
  const prevBtn = document.querySelector('.slide-prev');
  const nextBtn = document.querySelector('.slide-next');
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.slide-dot'));

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  prevBtn.addEventListener('click', () => goToSlide(current - 1));
  nextBtn.addEventListener('click', () => goToSlide(current + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(current - 1);
    if (e.key === 'ArrowRight') goToSlide(current + 1);
  });
}
