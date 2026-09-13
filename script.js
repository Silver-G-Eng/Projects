
const gallery = document.getElementById('gallery');
 
function updateScrollHint() {
  const atEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 5;
  gallery.classList.toggle('at-end', atEnd);
}
 
if (gallery) {
  gallery.addEventListener('scroll', updateScrollHint);
  window.addEventListener('resize', updateScrollHint);
  updateScrollHint();
}
