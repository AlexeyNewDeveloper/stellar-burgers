import { URL_FOR_GET_DATA } from "./constants";
import { checkResponse } from "./utils";

export function getIngredients() {
  return fetch(`${URL_FOR_GET_DATA}/ingredients`).then(checkResponse);
}

export function makeOrder(orderList) {
  return fetch(`${URL_FOR_GET_DATA}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: orderList,
    }),
  }).then(checkResponse);
}
