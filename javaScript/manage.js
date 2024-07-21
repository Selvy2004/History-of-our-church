'use strict';

// OPEN AND CLOSE BOOKMARK BTN
const parent = document.querySelector('.container');
const bookmarkWindow = document.querySelector('.bookmark-window');
const overlay = document.querySelector('.overlay-layer');
const closeBookmarkWindow = document.querySelector('.close-bookmarkwindow-btn');

const closeBookmarkWindowfunc = function () {
  bookmarkWindow.classList.add('hidden-window');
  overlay.classList.remove('overlay');
}

parent.addEventListener('click', function (e) {
  const bookamrkBtn = e.target.closest('.bookmark-btn-container');
  if (!bookamrkBtn) return;
  e.preventDefault();
  bookmarkWindow.classList.remove('hidden-window');
  overlay.classList.add('overlay');
});

closeBookmarkWindow.addEventListener('click', closeBookmarkWindowfunc);
overlay.addEventListener('click', function (e) {
  if (e.target === this && !bookmarkWindow.classList.contains('hidden-window')) {
    closeBookmarkWindowfunc();
  }
  return;
});


// Dark mode
const darkBtn = document.querySelector('.moon-btn');
let theme = localStorage.getItem('theme') || 'light';

darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.moon-icon').classList.toggle('moon-fill');
  document.body.classList.contains('dark-mode') ? theme = 'dark' : theme = 'light';
  localStorage.setItem('theme', theme);
});

window.addEventListener('load', () => {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('.moon-icon').classList.add('moon-fill');
    return;
  };
});


// Related to Media-query

// Open and Close Navigation
const navList = document.querySelector('.nav-list');
const openMenu = document.querySelector('.open-menu');
const closeMenu = document.querySelector('.close-menu');
const navBtns = document.querySelectorAll('.nav-btn');

const closeMenuFun = function () {
  navList.style.display = 'none';
  openMenu.classList.remove('hidden');
  closeMenu.classList.add('hidden');
};

if (window.innerWidth <= 1100) {
  navList.style.display = 'none';
  openMenu.classList.remove('hidden');
  navBtns.forEach(btn => btn.style.backgroundColor = 'var(--white-color)');
}

openMenu.addEventListener('click', function () {
  navList.style.display = 'flex';
  this.classList.add('hidden');
  closeMenu.classList.remove('hidden');
});

closeMenu.addEventListener('click', closeMenuFun);
window.addEventListener('click', function (e) {
  if (window.innerWidth > 1100 || closeMenu.classList.contains('hidden') || e.target.closest('.open-menu')) return;
  const pressNavList = e.target.closest('.nav-list');
  if (pressNavList) return;
  closeMenuFun();
});
