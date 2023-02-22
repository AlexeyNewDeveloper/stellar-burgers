import { IIngredient } from "../../types";
import { TYPE_MAIN, TYPE_SAUCE } from "../../utils/constants";

// export type TIngredientNotBun = IIngredient & {
//   type: typeof TYPE_MAIN | typeof TYPE_SAUCE;
// };

export interface IBurgerConstructorTargetInitialState {
  ingredients: Array<IIngredient>;
  bun: null | IIngredient;
}
// export interface IBurgerConstructorTargetInitialState {
//   ingredientsForConstructor: {
//     ingredients: Array<IIngredient>;
//     bun: null | IIngredient;
//   };
// }

export const burgerConstructorTargetInitialState: IBurgerConstructorTargetInitialState =
  {
    ingredients: [],
    bun: null,
  };
