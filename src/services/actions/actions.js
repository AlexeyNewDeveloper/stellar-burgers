import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse, getListOrder } from "../../utils/utils";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const MAKE_ORDER = "MAKE_ORDER";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export const OPEN_POPUP = "OPEN_POPUP";
export const CLOSE_POPUP = "CLOSE_POPUP";

// export const GET_INGREDIENTS_FOR_CONSTRUCTOR =
//   "GET_INGREDIENTS_FOR_CONSTRUCTOR";

export function getIngredientsAction() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    fetch(`${URL_FOR_GET_DATA}/ingredients`)
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  };
}

export function makeOrderAction() {
  return function (dispatch, getState) {
    const orderList = getListOrder(
      getState().getIngredientsReducer.ingredientsForConstructor
    );

    dispatch({
      type: MAKE_ORDER,
    });
    fetch(`${URL_FOR_GET_DATA}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: orderList,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          listIngredientsOrder: orderList,
          orderNumber: res.order.number,
        });
      })
      .catch((err) => {
        dispatch({ type: MAKE_ORDER_FAILED });
      });
  };
}
