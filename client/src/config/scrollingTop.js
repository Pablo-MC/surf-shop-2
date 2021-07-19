// Scrolling Top
window.addEventListener('scroll', function () {
  const scrollTop = document.querySelector('.scrollTop');
  scrollTop.classList.toggle('active', window.scrollY > 500);
});

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}