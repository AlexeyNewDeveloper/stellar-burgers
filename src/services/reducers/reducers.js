import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  OPEN_POPUP,
  CLOSE_POPUP,
  MAKE_ORDER,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
} from "../actions/actions";
import { getIngredientsForConstructor } from "../../utils/utils";

const initialState = {
  ingredients: [],
  ingredientsForConstructor: [],
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
        ingredientsForConstructor: getIngredientsForConstructor(
          action.ingredients
        ),
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

// export const getIngredientsForConstructorReducer = (
//   state = initialState,
//   action
// ) => {
//   switch (action.type) {
//     case GET_INGREDIENTS_FOR_CONSTRUCTOR: {
//       return {
//         ...state,
//         ingredientsForConstructor: getIngredientsForConstructor(
//           state.ingredients
//         ),
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// };
