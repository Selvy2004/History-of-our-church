import * as model from "./model.js";
import mainResultView from "./views/mainResultView.js";
import previewView from "./views/previewView.js";
import { data } from "./data.js";

const loadMainResult = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  mainResultView.renderSpinner();

  setTimeout(() => {
    previewView.updateActiveLink();
    // Page Load
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
}
init()