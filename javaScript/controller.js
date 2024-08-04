import * as model from "./model.js";
import { data } from "./data.js";
import mainResultView from "./views/mainResultView.js";
import previewView from "./views/previewView.js";
import paginationView from "./views/paginationView.js";
import bookMarkView from "./views/bookMarkView.js";
import resultsListView from "./views/resultsListView.js";

const loadMainResult = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  previewView.updateActiveLink();
  mainResultView.render(model.mainResultData(id));
};

const loadResults = function () {
  previewView.recommendationPreview(data.filter(obj => obj.reco === true));
  previewView.searchBtn(data);
}

const init = function () {
  loadResults();
  mainResultView.eventsHandler(loadMainResult);
  paginationView._addHandlerClick(previewView.controlPagination.bind(previewView));
  bookMarkView.bookmarkBtnEventHandler();
  bookMarkView.showBookmarksBtn();
  previewView.scrollToMainResults();
  resultsListView.listResultsEvents();
}
init()