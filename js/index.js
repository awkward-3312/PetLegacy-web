// js/index.js (para index.html)
import './preloader.js';

const navToggle = document.getElementById('nav-toggle');
const menu = document.getElementById('menu');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('open');
});
