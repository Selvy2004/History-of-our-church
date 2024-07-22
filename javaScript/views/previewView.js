import View from "./view.js";
import paginationView from "./paginationView.js";

class PreviewView extends View {
  _parentElement = document.querySelector('.preview-list');
  _mainData;

  _generateMarkup() {
    return this._data.map(previewData => `
      <li class="preview">
          <a href="#${previewData.id}" class="preview-link  ${previewData.id === window.location.hash.slice(1) ? 'preview-link-active' : ''}">
            <img class="preview-img" src="${previewData.imageURL}" alt="${previewData.name}"/>
            <p class="preview-name">${previewData.name}</p>
          </a>
        </li>
    `).join('');
  }

  recommendationPreview(data) {
    this._mainData = data;
    this.render(paginationView.getSearchResultsPage(data));
    paginationView.render(data);
  }

  searchBtn(allData) {
    const searchField = document.querySelector('.search-field');
    const searchBtn = document.querySelector('.search-btn');
    const resultsWord = document.querySelector('.reco-result');
    let mainData;

    searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      searchField.setAttribute('placeholder', 'بحث ...');
      resultsWord.textContent = 'Recommendation';

      if (!searchField.value || searchField.value === ' ') return;
      mainData = allData.filter(obj => obj.name.includes(searchField.value) || obj.subtopic?.name.includes(searchField.value));

      searchField.value = '';

      if (mainData.length === 0) {
        searchField.setAttribute('placeholder', 'لا توجد نتائج...');
        this.recommendationPreview(this._data.filter(obj => obj.reco === true));
        return;
      };
      resultsWord.textContent = 'Results';
      this._mainData = mainData;

      if (window.innerWidth <= 1100) {
        document.querySelector('.reco-result').scrollIntoView({ behavior: 'smooth' });
      }

      // this.renderSpinner();
      setTimeout(() => {
        this.render(paginationView.getSearchResultsPage(mainData));
        paginationView.render(mainData);
      }, 400);
    }.bind(this));
  }

  controlPagination(goToPage) {
    if (!this._mainData) return;
    this.render(paginationView.getSearchResultsPage(this._mainData, goToPage));
    paginationView.render(this._mainData, goToPage);
  }

  updateActiveLink() {
    const links = document.querySelectorAll('.preview-link');

    links.forEach(link => {
      if (link.getAttribute('href') === window.location.hash) {
        link.classList.add('preview-link-active');
      } else {
        link.classList.remove('preview-link-active');
      }
    });
  }

  scrollToMainResults() {
    parent.addEventListener('click', (e) => {
      const previewItem = e.target.closest('.preview-link');
      if (!previewItem) return;
      document.querySelector('.pagination').scrollIntoView({ behavior: 'smooth' });
    })
  }
}
export default new PreviewView();