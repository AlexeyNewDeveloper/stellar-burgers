import React from "react";
import styles from "./order-details.module.css";
import Spinner from "../spinner/spinner";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { makeOrderAction } from "../../services/actions/makeOrderAction";
import { updateAccessTokenAction } from "../../services/actions/userAction";
import { getUserState } from "../../services/selectors/userStateSelectors";
import { getMakeOrderState } from "../../services/selectors/makeOrderStateSelector";
import { getReadyForNewOrder } from "../../services/actions/makeOrderAction";
import { getInitialStateForToken } from "../../services/actions/userAction";
import { getInitialStateForBurgerConstructorTarget } from "../../services/actions/burgerConstructorTargetAction";

const OrderDetails: React.FC = () => {
  const {
    orderObj,
    makeOrderRequest,
    makeOrderFailed,
    makeOrderRequestSuccess,
  } = useSelector(getMakeOrderState);
  const { user, updateTokenRequestSuccess } = useSelector(getUserState);
  const createOrder = React.useRef(false);
  const dispatch = useDispatch();
  const localUser: string | null = localStorage.getItem("user");

  React.useEffect(() => {
    if (
      !createOrder.current &&
      !makeOrderRequestSuccess &&
      !orderObj.number &&
      user
    ) {
      dispatch(makeOrderAction(user.accessToken));
      createOrder.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (makeOrderFailed) {
      dispatch(
        updateAccessTokenAction(localUser && JSON.parse(localUser).refreshToken)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeOrderFailed]);

  React.useEffect(() => {
    if (updateTokenRequestSuccess && user) {
      dispatch(makeOrderAction(user.accessToken));
      dispatch(getInitialStateForToken());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTokenRequestSuccess]);

  React.useEffect(() => {
    return () => {
      if (makeOrderRequestSuccess) {
        dispatch(getReadyForNewOrder());
        createOrder.current = false;
        dispatch(getInitialStateForBurgerConstructorTarget());
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeOrderRequestSuccess]);

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
};

export default OrderDetails;
