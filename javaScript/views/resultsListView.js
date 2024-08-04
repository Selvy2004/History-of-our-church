import View from "./view.js";
import { data } from "../data.js";

class ResultsListView extends View {
  _parentElement = document.querySelector('.results-list-container');

  _generateMarkup() {
    return `
        <ul class="list-results">
          ${this._data.map(item => this._listMarkup(item)).join('')}
        </ul>
      `
  }

  _listMarkup(item) {
    const searchField = document.querySelector('.search-field');

    const highlightedName = this.highlightMatch(item.name, searchField.value);
    return `
      <li class="list-results-item">
        <a href="#${item.id}" class="list-results-item-link">${highlightedName}</a>
        <svg class="search-icon results-search-icon">
          <use href="img/icons.svg#icon-search"></use>
        </svg>
      </li>
    `
  }

  listResultsEvents() {
    const searchField = document.querySelector('.search-field');

    searchField.addEventListener('click', () => {
      searchField.scrollIntoView({ behavior: 'smooth' });
    });

    searchField.addEventListener('input', () => {
      this._clear();
      this._parentElement.classList.remove('hidden');

      if (searchField.value === ' ') return;
      const mainData = data.filter(obj => obj.name.includes(searchField.value) || obj.subtopic?.name.includes(searchField.value)).sort();

      if (mainData.length === 0) {
        this._parentElement.insertAdjacentHTML('afterbegin', this._noResultsMarkup());
        return;
      }

      const collator = new Intl.Collator('ar');
      const sortedDataArray = mainData.sort((a, b) => collator.compare(a.name, b.name));

      if (sortedDataArray.length > 8) {
        sortedDataArray.splice(8);
      }

      this.render(sortedDataArray); // Pass this._data
    });

    window.addEventListener('click', (e) => {
      if (e.target === searchField) return;
      this._parentElement.classList.add('hidden');
    });

    this._parentElement.addEventListener('click', (e) => {
      const resultItem = e.target.closest('.list-results-item');
      if (!resultItem) return;

      document.querySelector('.pagination').scrollIntoView({ behavior: 'smooth' });
    })

  }

  _noResultsMarkup() {
    return `لا توجد نتائج ...`;
  }

  highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'i');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
}
export default new ResultsListView();
