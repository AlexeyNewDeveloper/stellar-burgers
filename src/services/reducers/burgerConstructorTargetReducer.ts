import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  INITIAL_STATE_BURGER_CONSTRUCTOR_TARGET,
} from "../actions/burgerConstructorTargetAction";
import { burgerConstructorTargetInitialState } from "../states/burgerConstructorTargetState";
import { TYPE_BUN } from "../../utils/constants";
import { TBurgerConstructorTargetActions } from "../actions/burgerConstructorTargetAction";

export const burgerConstructorTargetReducer = (
  state = burgerConstructorTargetInitialState,
  action: TBurgerConstructorTargetActions
) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      console.log(action.ingredient.type === TYPE_BUN);
      if (action.ingredient.type === TYPE_BUN) {
        const aaaaa = {
          ...state,
          bun: action.ingredient,
        };
        console.log(aaaaa);
        return {
          ...state,
          bun: action.ingredient,
        };
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients, action.ingredient],
        };
      }
    }
    case DELETE_INGREDIENT: {
      let ingredients = state.ingredients;
      ingredients.splice(action.deleteIndex, 1);
      return {
        ...state,
        ingredients: ingredients,
        // totalPrice: calcTotalPrice(
        //   ingredients,
        //   state.ingredientsForConstructor.bun
        //     ? state.ingredientsForConstructor.bun
        //     : { price: 0 }
        // ),
      };
    }
    case MOVE_INGREDIENT: {
      let ingredients = state.ingredients.slice();
      ingredients.splice(action.dragIndex, 1);
      ingredients.splice(action.hoverIndex, 0, action.element);
      return {
        ...state,
        ingredients: ingredients,
      };
    }
    case INITIAL_STATE_BURGER_CONSTRUCTOR_TARGET: {
      return {
        ...state,
        ingredients: [],
        bun: null,
      };
    }
    default: {
      return state;
    }
  }
};
