import View from "./view.js";
import { data } from "../data.js";

export let bookmarksArr = JSON.parse(localStorage.getItem('bookmarks')) || [];

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks-list');
  _bookmarksArr = bookmarksArr;

  addHandlerRander(handler) {
    window.addEventListener('load', handler);
  }

  bookmarkBtnEventHandler() {
    const mainResultParent = document.querySelector('.main-result-parent');
    console.log(bookmarksArr);

    mainResultParent.addEventListener('click', (e) => {  // arrow function because of this keyword
      const btn = e.target.closest('.bookmark-item-btn');
      if (!btn) return;
      e.preventDefault();

      const id = window.location.hash.slice(1);
      const curitem = this.mainResultData(id);
      console.log(curitem);

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

  }

  mainResultData(id) {
    const mainData = data.find(obj => obj.id === id);
    return mainData;
  }
}
export default new BookmarksView();