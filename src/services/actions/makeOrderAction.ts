import { URL_FOR_GET_DATA } from "../../utils/constants";
import { getListOrder } from "../../utils/utils";
import { requestTo } from "../../utils/utils";
import { AppDispatch, AppThunk, AppGetState } from "../types";
import { TSimpleAction } from "./typesActions";

export const MAKE_ORDER: "MAKE_ORDER" = "MAKE_ORDER";
export const MAKE_ORDER_SUCCESS: "MAKE_ORDER_SUCCESS" = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED: "MAKE_ORDER_FAILED" = "MAKE_ORDER_FAILED";
export const READY_FOR_NEW_ORDER: "READY_FOR_NEW_ORDER" = "READY_FOR_NEW_ORDER";

type TGetReadyForNewOrder = TSimpleAction<typeof READY_FOR_NEW_ORDER>;
type TGetMakeOrder = TSimpleAction<typeof MAKE_ORDER>;
type TGetMakeOrderFailed = TSimpleAction<typeof MAKE_ORDER_FAILED>;
type TGetMakeOrderSuccess = TSimpleAction<typeof MAKE_ORDER_SUCCESS> & {
  listIngredientsOrder: Array<string>;
  orderNumber: number;
};

export type TMakeOrderActions =
  | TGetReadyForNewOrder
  | TGetMakeOrder
  | TGetMakeOrderFailed
  | TGetMakeOrderSuccess;

export const getReadyForNewOrder = (): TGetReadyForNewOrder => {
  return {
    type: READY_FOR_NEW_ORDER,
  };
};
export const getMakeOrder = (): TGetMakeOrder => {
  return {
    type: MAKE_ORDER,
  };
};
export const getMakeOrderSuccess = (
  listIngredientsOrder: Array<string>,
  orderNumber: number
): TGetMakeOrderSuccess => {
  return {
    type: MAKE_ORDER_SUCCESS,
    listIngredientsOrder,
    orderNumber,
  };
};
export const getMakeOrderFailed = (): TGetMakeOrderFailed => {
  return {
    type: MAKE_ORDER_FAILED,
  };
};

export const makeOrderAction: AppThunk = (token: string) => {
  return function (dispatch: AppDispatch, getState: AppGetState) {
    const orderList = getListOrder(getState().burgerConstructorTargetReducer);
    if (orderList) {
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
    } else {
      dispatch(getMakeOrderFailed());
    }
  };
};
