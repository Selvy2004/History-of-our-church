import View from "./view.js";


class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    this._data = {
      results: this._data,
      page: this.page,
      resultsPerPage: 4
    };
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Page 1
    if (numPages > 1 && curPage === 1) {
      return `
        <button data-goto="${curPage + 1}" class="btn-inline pagination-btn-next">
          <svg class="search-icon">
            <use href="img/icons.svg#icon-arrow-right"></use>
          </svg>
          <span class="page-pagination">${curPage + 1} Slide</span>
        </button>
      `;
    }

    // others
    if (curPage !== 1 && curPage < numPages) {
      return `
        <button data-goto="${curPage + 1}" class="btn-inline pagination-btn-next">
          <svg class="search-icon">
            <use href="img/icons.svg#icon-arrow-right"></use>
          </svg>
          <span class="page-pagination">${curPage + 1} Slide</span>
        </button>

        <button data-goto="${curPage - 1}" class="btn-inline pagination-btn-prev">
          <span class="page-pagination">Slide ${curPage - 1}</span>
          <svg class="search-icon">
            <use href="img/icons.svg#icon-arrow-left"></use>
          </svg>
        </button>
      `;
    }

    // Last Page
    if (curPage === numPages && numPages !== 1) {
      return `
        <button data-goto="${curPage - 1}" class="btn-inline pagination-btn-prev">
          <span class="page-pagination">Slide ${curPage - 1}</span>
          <svg class="search-icon">
            <use href="img/icons.svg#icon-arrow-left"></use>
          </svg>
        </button>
      `;
    }

    // One page
    return '';
  }

  getSearchResultsPage(data, page = 1) {
    this._data = {
      results: data,
      page: page,
      resultsPerPage: 4
    };

    const start = (page - 1) * this._data.resultsPerPage;
    const end = page * this._data.resultsPerPage;

    return this._data.results.slice(start, end);
  }

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-inline');
      if (!btn) return;
      e.preventDefault();
      const goToPage = +btn.getAttribute('data-goto');
      handler(goToPage);
    })
  }
}
export default new PaginationView();