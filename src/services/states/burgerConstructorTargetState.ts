import { IIngredient } from "../../types";

export interface IBurgerConstructorTargetInitialState {
  ingredients: Array<IIngredient>;
  bun: null | IIngredient;
}

export const burgerConstructorTargetInitialState: IBurgerConstructorTargetInitialState =
  {
    ingredients: [],
    bun: null,
  };
