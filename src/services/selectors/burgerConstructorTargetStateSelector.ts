import { RootState } from "../types";
import { IBurgerConstructorTargetInitialState } from "../states/burgerConstructorTargetState";

export const getBurgerConstructorTargetState = (
  state: RootState
): IBurgerConstructorTargetInitialState => state.burgerConstructorTargetReducer;
// export const getBurgerConstructorTargetState = (
//   state: RootState
// ): IBurgerConstructorTargetInitialState["ingredientsForConstructor"] =>
//   state.burgerConstructorTargetReducer.ingredientsForConstructor;
