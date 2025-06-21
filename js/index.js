// js/index.js (para index.html)
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.6s ease';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }
});

const navToggle = document.getElementById('nav-toggle');
const menu = document.getElementById('menu');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('open');
});
