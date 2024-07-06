import * as model from "./model.js";
import mainResultView from "./mainResultView.js";
import previewView from "./previewView.js";
import { data } from "./data.js";

const loadMainResult = function () {

  mainResultView.randerSpinner(); // THIS STEP !!!!!!!
  const id = window.location.hash.slice(1);
  console.log(id);
  if (!id) return;
  console.log(id);

  // Page Load
  mainResultView.render(model.mainResultData(id));
  // Render Main-Result

};
const loadResults = function () {
  // mainResultView.randerSpinner();
  previewView.searchBtn(data);

}

loadResults();
const init = function () {
  mainResultView.eventsHandler(loadMainResult);
}
init()