import React from "react";
import styles from "./order-details.module.css";
import Spinner from "../spinner/spinner";
import { useSelector, useDispatch } from "react-redux";
import { makeOrderAction } from "../../services/actions/makeOrderAction";
import { updateAccessTokenAction } from "../../services/actions/userAction";
import { getUserState } from "../../services/selectors/userStateSelectors";
import { getMakeOrderState } from "../../services/selectors/makeOrderStateSelector";
import { getReadyForNewOrder } from "../../services/actions/makeOrderAction";
import { getInitialStateForToken } from "../../services/actions/userAction";

export default function OrderDetails() {
  const {
    orderObj,
    makeOrderRequest,
    makeOrderFailed,
    makeOrderRequestSuccess,
  } = useSelector(getMakeOrderState);
  const { user, updateTokenRequestSuccess } = useSelector(getUserState);
  const sendOrder = React.useRef(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (makeOrderFailed) {
      dispatch(
        updateAccessTokenAction(
          JSON.parse(sessionStorage.getItem("user")).refreshToken
        )
      );
    }
    if (!orderObj.number && (!sendOrder.current || updateTokenRequestSuccess)) {
      dispatch(makeOrderAction(user.accessToken));
      sendOrder.current = true;
      console.log("send order. (true): ", sendOrder.current);
    }

    if (updateTokenRequestSuccess) {
      dispatch(getInitialStateForToken());
    }

    return () => {
      if (makeOrderRequestSuccess) {
        dispatch(getReadyForNewOrder());
        if (updateTokenRequestSuccess) {
          dispatch(getInitialStateForToken());
        }
        sendOrder.current = false;
        console.log("ready for new order", makeOrderRequestSuccess);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeOrderFailed, updateTokenRequestSuccess, makeOrderRequestSuccess]);

  return (
    <>
      {makeOrderRequest && <Spinner />}
      {makeOrderFailed && "Ошибка, пробую еще раз..."}
      <p className="text text_type_digits-large mb-8">{orderObj.number}</p>
      {orderObj.number && (
        <>
          <p className="text text_type_main-medium mb-15">
            Идентификатор заказа
          </p>
          <div className={`${styles.icon_complete} mb-15`}></div>
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </>
  );
}
