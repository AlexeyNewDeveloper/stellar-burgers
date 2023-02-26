import { TSimpleAction } from "./typesActions";
import { IIngredient } from "../../types";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const INITIAL_STATE_BURGER_CONSTRUCTOR_TARGET: "INITIAL_STATE_BURGER_CONSTRUCTOR_TARGET" =
  "INITIAL_STATE_BURGER_CONSTRUCTOR_TARGET";

type TAddIngredientAction = TSimpleAction<typeof ADD_INGREDIENT> & {
  ingredient: IIngredient;
};

type TDeleteIngredientAction = TSimpleAction<typeof DELETE_INGREDIENT> & {
  deleteIndex: number;
};

type TMoveIngredientAction = TSimpleAction<typeof MOVE_INGREDIENT> & {
  dragIndex: number;
  hoverIndex: number;
  element: IIngredient;
};

type TGetInitialStateForBurgerConstructorTarget = TSimpleAction<
  typeof INITIAL_STATE_BURGER_CONSTRUCTOR_TARGET
>;

export const addIngredientAction = (
  ingredient: IIngredient
): TAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    ingredient: { ...ingredient },
  };
};

export const deleteIngredientAction = (
  deleteIndex: number
): TDeleteIngredientAction => {
  return {
    type: DELETE_INGREDIENT,
    deleteIndex,
  };
};

export const moveIngredientAction = (
  dragIndex: number,
  hoverIndex: number,
  element: IIngredient
): TMoveIngredientAction => {
  return {
    type: MOVE_INGREDIENT,
    dragIndex,
    hoverIndex,
    element,
  };
};

export const getInitialStateForBurgerConstructorTarget =
  (): TGetInitialStateForBurgerConstructorTarget => {
    return {
      type: INITIAL_STATE_BURGER_CONSTRUCTOR_TARGET,
    };
  };

export type TBurgerConstructorTargetActions =
  | TGetInitialStateForBurgerConstructorTarget
  | TAddIngredientAction
  | TDeleteIngredientAction
  | TMoveIngredientAction;
