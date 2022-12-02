import React from "react";
import styles from "./order-details.module.css";
import Spinner from "../spinner/spinner";
import { useSelector, useDispatch } from "react-redux";
import { makeOrderAction } from "../../services/actions/actions";

export default function OrderDetails() {
  const { orderObj, makeOrderRequest, makeOrderFailed } = useSelector(
    (state) => state.makeOrderReducer
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(makeOrderAction());
  }, []);

  return (
    <>
      {makeOrderRequest && <Spinner />}
      {makeOrderFailed && "Ошибка"}
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
