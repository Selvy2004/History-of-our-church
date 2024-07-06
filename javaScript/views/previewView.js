import View from "./view.js";

class PreviewView extends View {
  _parentElement = document.querySelector('.preview-list');

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
    this.render(data);
  }

  searchBtn(allData) {
    const searchField = document.querySelector('.search-field');
    const searchBtn = document.querySelector('.search-btn');
    const resultsWord = document.querySelector('.reco-result');

    searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      searchField.setAttribute('placeholder', 'بحث ...');
      resultsWord.textContent = 'Recommendation';

      if (!searchField.value) return;
      const mainData = allData.filter(obj => obj.name.includes(searchField.value) || obj.subtopic?.name.includes(searchField.value));

      searchField.value = '';

      if (mainData.length === 0) {
        searchField.setAttribute('placeholder', 'لا توجد نتائج...');
        this.recommendationPreview(this._data.filter(obj => obj.reco === true));

        return;
      };

      resultsWord.textContent = 'Results';
      this.render(mainData);
    }.bind(this));
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

}
export default new PreviewView();