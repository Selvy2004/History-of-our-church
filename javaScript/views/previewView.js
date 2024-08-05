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
    this.renderSpinner();
    setTimeout(() => {
      this.render(paginationView.getSearchResultsPage(data));
      paginationView.render(data);
    }, 400);
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
      document.querySelector('.reco-title-container').style.marginBottom = '2rem';

      // NO input or white spaces
      if (!searchField.value.trim()) return;
      mainData = allData.filter(obj => obj.name.includes(searchField.value) || obj.subtopic?.name.includes(searchField.value));
      searchField.value = '';

      // No Results
      if (mainData.length === 0) {
        searchField.setAttribute('placeholder', 'لا توجد نتائج...');
        this.recommendationPreview(this._data.filter(obj => obj.reco === true));
        return;
      };

      // Results
      resultsWord.textContent = 'Results';
      this._mainData = mainData;

      // back to recommendation btn
      document.querySelector('.btn-reco-container').innerHTML = '';
      document.querySelector('.reco-title-container').style.marginBottom = '0';

      if (window.innerWidth <= 1100) {
        document.querySelector('.reco-result').scrollIntoView({ behavior: 'smooth' });
      }
      // Render Spinner
      this.renderSpinner();
      // View it perfectly ^_^
      setTimeout(() => {
        this.backToRecoMarkup();
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

  backToRecommendation(data) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.back-to-reco');
      if (!btn) return;
      btn.classList.add('hidden');
      document.querySelector('.btn-reco-container').innerHTML = '';
      this.recommendationPreview(data);
      document.querySelector('.reco-result').textContent = 'Recommendation';
      document.querySelector('.reco-title-container').style.marginBottom = '2rem';
    });
  }

  backToRecoMarkup() {
    const markup = `
      <div class="back-to-reco">
        <p>back to Recommendation</p> 
        <span class="back-to-reco-arrow">&larr;</span>
      </div>
    `;
    document.querySelector('.btn-reco-container').insertAdjacentHTML('afterbegin', markup);
  }
}
export default new PreviewView();