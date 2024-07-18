import * as model from "./model.js";
import { data } from "./data.js";
import mainResultView from "./views/mainResultView.js";
import previewView from "./views/previewView.js";
import paginationView from "./views/paginationView.js";
import bookMarkView from "./views/bookMarkView.js";

const loadMainResult = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  // mainResultView.renderSpinner();
  previewView.updateActiveLink();

  // setTimeout(() => {
  // }, 400);
  mainResultView.render(model.mainResultData(id));
};

const loadResults = function () {
  // previewView.renderSpinner();

  // setTimeout(() => {
  // }, 400);
  previewView.recommendationPreview(data.filter(obj => obj.reco === true));
  previewView.searchBtn(data);
}

const bookmarkHandler = function () {

}



const init = function () {
  loadResults();
  mainResultView.eventsHandler(loadMainResult);
  paginationView._addHandlerClick(previewView.controlPagination.bind(previewView));
  bookMarkView.bookmarkBtnEventHandler();
}
init()