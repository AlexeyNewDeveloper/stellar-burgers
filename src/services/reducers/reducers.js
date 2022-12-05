import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  OPEN_POPUP,
  CLOSE_POPUP,
  MAKE_ORDER,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
} from "../actions/actions";
import { calcTotalPrice } from "../../utils/utils";

const initialState = {
  ingredients: [],
  ingredientsForConstructor: {
    ingredients: [],
    totalPrice: 0,
    bun: null,
  },
  currentDetailInfoIngredient: {},
  orderObj: {
    number: null,
    listIngredientsOrder: [],
  },
  ingredientsRequest: false,
  ingredientsFailed: false,
  makeOrderRequest: false,
  makeOrderFailed: false,
};

export const makeOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER: {
      return {
        ...state,
        makeOrderRequest: true,
        makeOrderFailed: false,
        orderObj: {
          ...state.orderObj,
          number: null,
        },
      };
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        makeOrderRequest: false,
        makeOrderFailed: false,
        orderObj: {
          ...state.orderObj,
          listIngredientsOrder: action.listIngredientsOrder,
          number: action.orderNumber,
        },
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        makeOrderRequest: false,
        makeOrderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const openPopupReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP: {
      return {
        ...state,
        currentDetailInfoIngredient: action.ingredient,
      };
    }
    default: {
      return state;
    }
  }
};

export const closePopupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_POPUP: {
      return {
        ...state,
        currentDetailInfoIngredient: {},
      };
    }
    default: {
      return state;
    }
  }
};

export const getIngredientsReducer = (state = initialState, action) => {
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
        // ingredientsForConstructor: getIngredientsForConstructor(
        //   action.ingredients
        // ),
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

export const burgerConstructorTargetReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === "bun") {
        return {
          ...state,
          ingredientsForConstructor: {
            ...state.ingredientsForConstructor,
            totalPrice: calcTotalPrice(
              [...state.ingredientsForConstructor.ingredients],
              action.ingredient
            ),
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
            totalPrice: calcTotalPrice(
              [...state.ingredientsForConstructor.ingredients],
              action.ingredient,
              state.ingredientsForConstructor.bun
                ? state.ingredientsForConstructor.bun
                : { price: 0 }
            ),
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
    default: {
      return state;
    }
  }
};
