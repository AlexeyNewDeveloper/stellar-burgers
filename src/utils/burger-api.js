import { URL_FOR_GET_DATA } from "./constants";
import { checkReponse } from "./utils";

export function getIngredients() {
  return fetch(`${URL_FOR_GET_DATA}/ingredients`).then(checkReponse);
}
