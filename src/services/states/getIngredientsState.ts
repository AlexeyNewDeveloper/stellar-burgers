import { IIngredient } from "../../types";

export interface IGetIngredientsInitialState {
  ingredients: Array<IIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export const getIngredientsInitialState: IGetIngredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};
