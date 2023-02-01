import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  INITIAL_STATE_BURGER_CONSTRUCTOR_TARGET,
} from "../actions/burgerConstructorTargetAction";
import { calcTotalPrice } from "../../utils/utils";
import { burgerConstructorTargetInitialState } from "../states/burgerConstructorTargetState";
import { TYPE_BUN } from "../../utils/constants";

export const burgerConstructorTargetReducer = (
  state = burgerConstructorTargetInitialState,
  action
) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === TYPE_BUN) {
        return {
          ...state,
          ingredientsForConstructor: {
            ...state.ingredientsForConstructor,
            bun: action.ingredient,
          },
        };
      } else {
        return {
          ...state,
          ingredientsForConstructor: {
            ...state.ingredientsForConstructor,
            ingredients: [
              ...state.ingredientsForConstructor.ingredients,
              action.ingredient,
            ],
          },
        };
      }
    }
    case DELETE_INGREDIENT: {
      let ingredients = state.ingredientsForConstructor.ingredients;
      ingredients.splice(action.deleteIndex, 1);
      return {
        ...state,
        ingredientsForConstructor: {
          ...state.ingredientsForConstructor,
          ingredients: ingredients,
          totalPrice: calcTotalPrice(
            ingredients,
            state.ingredientsForConstructor.bun
              ? state.ingredientsForConstructor.bun
              : { price: 0 }
          ),
        },
      };
    }
    case MOVE_INGREDIENT: {
      let ingredients = state.ingredientsForConstructor.ingredients.slice();
      ingredients.splice(action.dragIndex, 1);
      ingredients.splice(action.hoverIndex, 0, action.element);
      return {
        ...state,
        ingredientsForConstructor: {
          ...state.ingredientsForConstructor,
          ingredients: ingredients,
        },
      };
    }
    case INITIAL_STATE_BURGER_CONSTRUCTOR_TARGET: {
      return {
        ...state,
        ingredientsForConstructor: {
          ...state.ingredientsForConstructor,
          ingredients: [],
          bun: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};
