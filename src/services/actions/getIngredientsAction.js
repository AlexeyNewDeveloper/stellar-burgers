import { URL_FOR_GET_DATA } from "../../utils/constants";
import { requestTo } from "../../utils/utils";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredientsAction() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    requestTo(`${URL_FOR_GET_DATA}/ingredients`)
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  };
}
