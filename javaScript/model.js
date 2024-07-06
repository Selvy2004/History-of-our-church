import { data } from "./data.js";

export const mainResultData = function (id) {
  const mainData = data.find(obj => obj.id === id);
  return mainData;
}

