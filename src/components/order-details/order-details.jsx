import React from "react";
import styles from "./order-details.module.css";
import Spinner from "../spinner/spinner";
import { useSelector, useDispatch } from "react-redux";
import { makeOrderAction } from "../../services/actions/makeOrderAction";
import { updateAccessTokenAction } from "../../services/actions/userAction";
import { getUserState } from "../../services/selectors/userStateSelectors";

export default function OrderDetails() {
  const { orderObj, makeOrderRequest, makeOrderFailed } = useSelector(
    (state) => state.makeOrderReducer
  );
  const { user } = useSelector(getUserState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (makeOrderFailed) {
      dispatch(
        updateAccessTokenAction(
          JSON.parse(sessionStorage.getItem("user")).refreshToken
        )
      );
    }
    dispatch(makeOrderAction(user.accessToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeOrderFailed, user.accessToken]);

  return (
    <>
      {makeOrderRequest && <Spinner />}
      {makeOrderFailed && "Ошибка, пробую еще раз..."}
      <p className="text text_type_digits-large mb-8">{orderObj.number}</p>
      <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
      <div className={`${styles.icon_complete} mb-15`}></div>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}
