import {
  MAKE_ORDER,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  READY_FOR_NEW_ORDER,
} from "../actions/makeOrderAction";
import { makeOrderInitialState } from "../states/makeOrderState";

export const makeOrderReducer = (state = makeOrderInitialState, action) => {
  switch (action.type) {
    case MAKE_ORDER: {
      return {
        ...state,
        makeOrderRequest: true,
        makeOrderRequestSuccess: false,
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
        makeOrderRequestSuccess: true,
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
        makeOrderRequestSuccess: false,
        makeOrderFailed: true,
      };
    }
    case READY_FOR_NEW_ORDER: {
      return {
        ...state,
        makeOrderRequest: false,
        makeOrderRequestSuccess: false,
        makeOrderFailed: false,
        orderObj: {
          ...state.orderObj,
          listIngredientsOrder: [],
          number: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};
