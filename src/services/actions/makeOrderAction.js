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
export const getMakeOrder = () => {
  return {
    type: MAKE_ORDER,
  };
};
export const getMakeOrderSuccess = (listIngredientsOrder, orderNumber) => {
  return {
    type: MAKE_ORDER_SUCCESS,
    listIngredientsOrder,
    orderNumber,
  };
};
export const getMakeOrderFailed = () => {
  return {
    type: MAKE_ORDER_FAILED,
  };
};

export function makeOrderAction(token) {
  return function (dispatch, getState) {
    const orderList = getListOrder(
      getState().burgerConstructorTargetReducer.ingredientsForConstructor
    );

    dispatch(getMakeOrder());
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
        dispatch(getMakeOrderSuccess(orderList, res.order.number));
      })
      .catch((err) => {
        dispatch(getMakeOrderFailed());
      });
  };
}
