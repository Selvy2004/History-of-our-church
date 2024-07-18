import View from "./view.js";
import { bookmarksArr } from "./bookMarkView.js";


class MainResultView extends View {
  _parentElement = document.querySelector('.main-result-parent');

  _generateMarkup() {
    return `
    <div class="main-result">
      <div class="img-and-title">
        <img class="image ${this._data.category.includes('place') ? 'image-place' : ''}" src="${this._data.imageURL}" alt="${this._data.name}"/>
        <h2 class="result-title">${this._data.name}</h2>
      </div>
      <div>
        <button class="bookmark-item-btn">
          <svg class="icon icon-bookmark-item">
              <use class="bookmark-svg" href="img/icons.svg#icon-bookmark${this.checkIfBookmarked() ? '-fill' : ''}"></use>
          </svg>
        </button>
      </div>
      <div class="result-topics">
        <ul class="results-ul">${this._data.topics[0] !== 'Coming Soon' ? this._data.topics.map(topic => this._generateTopicks(topic)).join('') : this._comingSoon()}</ul>
        <ul class="results-ul">${this._data.subtopic?.topics ? this._data.subtopic.topics.map(topic => this._generateSubtopic(topic)).join('') : ''}</ul>
        <ul class="results-ul">${this._data.theEnd ? this._data.theEnd.map(topic => this._generateTopicks(topic)).join('') : ''}</ul>
      </div>
    </div>
    `;
  }


  _comingSoon() {
    return `
      <div class="coming-soon">...Coming Soon</div>
    `
  }
  _generateTopicks(topic) {
    return `
      <li class="result-topic">
      <div class="title-arrow-container">
        <h3 class="sub-title-result">${topic[0]}</h3>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="arrow-icon arrow-open">
            <path fill-rule="evenodd" d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
          </svg>

      </div>
      <div class="content hidden">
        <p class="subject-result">${topic[1]}</p>
      </div>
      </li>
    `;
  }

  _generateSubtopic(topic) {
    return `
    <li class="result-topic">
     <div class="title-arrow-container">
        <h3 class="sub-title-result">${topic[0]}</h3>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="arrow-icon arrow-open">
          <path fill-rule="evenodd" d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
          <path fill-rule="evenodd" d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z" clip-rule="evenodd" />
          </svg>
          
      </div>
      <div class="content hidden">
        <img class="image-subtopic" src="${this._data.subtopic.imageURL}" alt="${this._data.subtopic.name}"/>
        <p class="subject-result">${topic[1]}</p>
      </div>
    </li>
  `;
  }


  checkIfBookmarked() {
    const isBookmarked = bookmarksArr.some(bookmark => bookmark.id === this._data.id);
    this._data.bookmarked = isBookmarked;

    return this._data.bookmarked
  }

  eventsHandler(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));

    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const arrowBtn = e.target.closest('.arrow-icon');
      if (!arrowBtn) return;
      const currentTransform = arrowBtn.style.transform;
      const isRotated = currentTransform.includes('180deg');
      arrowBtn.style.transform = isRotated ? 'rotate(0deg)' : 'rotate(180deg)';

      const content = e.target.closest('.result-topic').querySelector('.content');
      content.classList.toggle('hidden');
    });
  }


};
export default new MainResultView();