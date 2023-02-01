import { URL_FOR_GET_DATA } from "../../utils/constants";
import { requestTo } from "../../utils/utils";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => {
  return {
    type: GET_INGREDIENTS,
  };
};

export const getIngredientsSuccess = (ingredients) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients,
  };
};

export const getIngredientsFailed = () => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};

export function getIngredientsAction() {
  return function (dispatch) {
    dispatch(getIngredients());
    requestTo(`${URL_FOR_GET_DATA}/ingredients`, null, {
      dispatch,
      successAction: getIngredientsSuccess(),
    })
      .then((res) => {
        dispatch(getIngredientsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
      });
  };
}
