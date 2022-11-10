import { URL_FOR_GET_DATA } from "./constants";
import { checkResponse } from "./utils";

export function getIngredients() {
  return fetch(`${URL_FOR_GET_DATA}/ingredients`).then(checkResponse);
}
