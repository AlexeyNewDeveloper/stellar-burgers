import { URL_FOR_GET_DATA } from "../../utils/constants";
import { requestTo } from "../../utils/utils";
import { IIngredient } from "../../types";
import { AppDispatch, AppThunk } from "../types";

export const GET_INGREDIENTS: "GET_INGREDIENTS" = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccess {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: Array<IIngredient>;
}

export type TGetIngredientsActions =
  | IGetIngredients
  | IGetIngredientsFailed
  | IGetIngredientsSuccess;

export const getIngredients = (): IGetIngredients => {
  return {
    type: GET_INGREDIENTS,
  };
};

export const getIngredientsSuccess = (
  ingredients: Array<IIngredient>
): IGetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients,
  };
};

export const getIngredientsFailed = (): IGetIngredientsFailed => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};

export const getIngredientsAction: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredients());
  requestTo(
    `${URL_FOR_GET_DATA}/ingredients`
    // , null, {
    //   dispatch,
    //   successAction: getIngredientsSuccess(),
    // }
  )
    .then((res) => {
      dispatch(getIngredientsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getIngredientsFailed());
    });
};
