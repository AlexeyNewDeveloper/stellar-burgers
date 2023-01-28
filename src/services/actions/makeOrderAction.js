import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse, getListOrder } from "../../utils/utils";
import { addNewOrderToUserHistory } from "./userAction";

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
    fetch(`${URL_FOR_GET_DATA}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: token,
      },
      body: JSON.stringify({
        ingredients: orderList,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        console.log(res);
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          listIngredientsOrder: orderList,
          orderNumber: res.order.number,
        });
        // dispatch(addNewOrderToUserHistory(res.order));
      })
      .catch((err) => {
        dispatch({ type: MAKE_ORDER_FAILED });
      });
  };
}
