import { URL_FOR_GET_DATA } from "../../utils/constants";
import { getListOrder } from "../../utils/utils";
import { requestTo } from "../../utils/utils";

export const MAKE_ORDER = "MAKE_ORDER";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";
export const READY_FOR_NEW_ORDER = "READY_FOR_NEW_ORDER";

export const getReadyForNewOrder = () => {
  return {
    type: READY_FOR_NEW_ORDER,
  };
};

export function makeOrderAction(token) {
  return function (dispatch, getState) {
    const orderList = getListOrder(
      getState().burgerConstructorTargetReducer.ingredientsForConstructor
    );

    dispatch({
      type: MAKE_ORDER,
    });
    requestTo(`${URL_FOR_GET_DATA}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: token,
      },
      body: JSON.stringify({
        ingredients: orderList,
      }),
    })
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
