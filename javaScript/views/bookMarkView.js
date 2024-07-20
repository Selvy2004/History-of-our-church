import View from "./view.js";
import { data } from "../data.js";

export let bookmarksArr = JSON.parse(localStorage.getItem('bookmarks')) || [];

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks-list');
  _bookmarksArr = bookmarksArr;

  _generateMarkup() {
    return this._data.map(item => `
        <a class="bookmark-item" href="#${item.id}">
          <div class="parent-bookmark-item-img"><img src="${item.imageURL}" class="bookmark-image" alt="${item.name}"/></div>
          <p class="preview-name">${item.name}</p>
        </a> 
    `).join('');
  }

  bookmarkBtnEventHandler() {
    const mainResultParent = document.querySelector('.main-result-parent');

    mainResultParent.addEventListener('click', (e) => {  // arrow function because of this keyword
      const btn = e.target.closest('.bookmark-item-btn');
      if (!btn) return;
      e.preventDefault();

      const id = window.location.hash.slice(1);
      const curitem = this.mainResultData(id);
      const bookmarksvg = document.querySelector('.bookmark-svg');

      // Un bookmark
      if (curitem.bookmarked) { // if true
        curitem.bookmarked = false;
        bookmarksvg.setAttribute('href', 'img/icons.svg#icon-bookmark');
        const index = this._bookmarksArr.findIndex(item => curitem.id === item.id);
        this._bookmarksArr.splice(index, 1);
        bookmarksArr = this._bookmarksArr;
        this.persisBookmarks();
        return;
      };

      // Add bookmark
      curitem.bookmarked = true;
      bookmarksvg.setAttribute('href', 'img/icons.svg#icon-bookmark-fill')
      this._bookmarksArr.push(curitem);
      bookmarksArr = this._bookmarksArr;
      this.persisBookmarks();
    });
  }

  persisBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksArr));
  }

  showBookmarksBtn() {
    parent.addEventListener('click', (e) => {
      const bookamrkBtn = e.target.closest('.bookmark-btn-container');
      if (!bookamrkBtn) return;
      if (bookmarksArr.length === 0) {
        this._clear();
        const markup = this.emptyBookMark();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        return;
      };
      this._clear();
      this.render(bookmarksArr);
    });

    parent.addEventListener('click', (e) => {
      const bookmarkItem = e.target.closest('.bookmark-item');
      if (!bookmarkItem) return;
      closeBookmarkWindowfunc();
      document.querySelector('.pagination').scrollIntoView({ behavior: 'smooth' });
    })
  }

  closeBookmarkWindowfunc() {
    bookmarkWindow.classList.add('hidden-window');
    overlay.classList.remove('overlay');
  }

  emptyBookMark() {
    return `
      <div class="empty-bookmarks">
        <svg class="icon-smile">
          <use href="img/icons.svg#icon-smile" ></use>
        </svg>            
        <p>.No bookmarks yet</p>
      </div>
    `;
  }

  mainResultData(id) {
    const mainData = data.find(obj => obj.id === id);
    return mainData;
  }
}
export default new BookmarksView();