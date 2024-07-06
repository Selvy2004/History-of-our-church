import * as model from "./model.js";
import mainResultView from "./views/mainResultView.js";
import previewView from "./views/previewView.js";
import { data } from "./data.js";

const loadMainResult = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  previewView.updateActiveLink();
  mainResultView.randerSpinner();
  // Page Load
  mainResultView.render(model.mainResultData(id));
};

const loadResults = function () {
  // mainResultView.randerSpinner();
  previewView.recommendationPreview(data.filter(obj => obj.reco === true));
  previewView.searchBtn(data);

}

const controlRecommendation = function () {
  window.addEventListener('load', function (e) {
    e.preventDefault();

  });
}

const init = function () {
  loadResults();
  mainResultView.eventsHandler(loadMainResult);
}
init()