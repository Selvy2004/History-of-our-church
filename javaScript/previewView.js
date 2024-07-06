class PreviewView {
  _parentElement = document.querySelector('.preview-list');

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data.map(previewData => `
      <li class="preview">
          <a href="#${previewData.id}" class="preview-link">
            <img class="preview-img" src="${previewData.imageURL}" alt="${previewData.name}"/>
            <p class="preview-name">${previewData.name}</p>
          </a>
        </li>
    `).join('');
  }


  _clear() {
    this._parentElement.innerHTML = '';
  }

  searchBtn(allData) {
    const searchField = document.querySelector('.search-field');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', function () {
      if (!searchField.value) return;
      const mainData = allData.filter(obj => obj.subtopic?.name.includes(searchField.value) || obj.name.includes(searchField.value));
      searchField.value = '';
      console.log(mainData);
      this.render(mainData);
    }.bind(this));
  }

}
export default new PreviewView();