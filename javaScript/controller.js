import * as model from "./model.js";
import mainResultView from "./views/mainResultView.js";
import previewView from "./views/previewView.js";
import paginationView from "./views/paginationView.js";
import { data } from "./data.js";

const loadMainResult = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  mainResultView.renderSpinner();
  previewView.updateActiveLink();

  setTimeout(() => {
    mainResultView.render(model.mainResultData(id));
  }, 400);
};

const loadResults = function () {
  previewView.renderSpinner();

  setTimeout(() => {
    previewView.recommendationPreview(data.filter(obj => obj.reco === true));
    previewView.searchBtn(data);
  }, 400);
}

const init = function () {
  loadResults();
  mainResultView.eventsHandler(loadMainResult);
  paginationView._addHandlerClick(previewView.controlPagination.bind(previewView));
}
init()