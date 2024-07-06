import * as model from "./model.js";
import mainResultView from "./mainResultView.js";
import previewView from "./previewView.js";
import { data } from "./data.js";

const loadMainResult = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  mainResultView.randerSpinner();
  // Page Load
  mainResultView.render(model.mainResultData(id));
};

const loadResults = function () {
  // mainResultView.randerSpinner();
  previewView.searchBtn(data);
}

const init = function () {
  loadResults();
  mainResultView.eventsHandler(loadMainResult);
}
init()