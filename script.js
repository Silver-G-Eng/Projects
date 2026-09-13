// Adds a fading edge on the right side of the gallery while there's
// more content to scroll to, and removes it once you reach the end.

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
      gallery.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // Click-and-drag scrolling for desktop mouse users.
  let isDown = false;
  let startX;
  let scrollStart;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
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
    gallery.scrollLeft = scrollStart - (e.pageX - startX);
  });
}
