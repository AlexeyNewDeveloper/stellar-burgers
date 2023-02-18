import { IIngredient } from "../../types";

export interface IBurgerConstructorTargetInitialState {
  ingredientsForConstructor: {
    ingredients: Array<IIngredient>;
    bun: null | IIngredient;
  };
}

export const burgerConstructorTargetInitialState: IBurgerConstructorTargetInitialState =
  {
    ingredientsForConstructor: {
      ingredients: [],
      bun: null,
    },
  };
