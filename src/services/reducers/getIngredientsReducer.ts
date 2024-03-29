import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/getIngredientsAction";
import { getIngredientsInitialState } from "../states/getIngredientsState";
import { IGetIngredientsInitialState } from "../states/getIngredientsState";
import { TGetIngredientsActions } from "../actions/getIngredientsAction";

export const getIngredientsReducer = (
  state = getIngredientsInitialState,
  action: TGetIngredientsActions
): IGetIngredientsInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
