import React from "react";
import styles from "./order-details.module.css";

export default function OrderDetails(props) {
  const [state, setState] = React.useState({
    data: null,
    hasError: false,
    isLoading: false,
  });
  React.useEffect(() => {
    function getData() {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      props.orderObject
        .makeOrderCallback(props.orderObject.listOrder)
        .then((res) => {
          setState((prevState) => ({ ...prevState, data: res }));
        })
        .catch(() => {
          setState((prevState) => ({ ...prevState, hasError: true }));
        })
        .finally(() => {
          setState((prevState) => ({ ...prevState, isLoading: false }));
        });
    }

    getData();
  }, []);

  return (
    <>
      <p className="text text_type_digits-large mb-8">
        {state.data && state.data.order.number}
      </p>
      <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
      <div className={`${styles.icon_complete} mb-15`}></div>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}
