"use strict";

// OPEN AND CLOSE BOOKmARK BTN
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
    console.log('dark');
    document.body.classList.add('dark-mode');
    document.querySelector('.moon-icon').classList.add('moon-fill');
    return;
  };
});
