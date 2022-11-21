import React from "react";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import Spinner from "../spinner/spinner";

export default function OrderDetails({ orderObject }) {
  const [state, setState] = React.useState({
    data: null,
    hasError: false,
    isLoading: false,
  });
  React.useEffect(() => {
    function getData() {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      orderObject
        .makeOrderCallback(orderObject.listOrder)
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
      {state.isLoading && <Spinner />}
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

OrderDetails.propTypes = {
  orderObject: PropTypes.shape({
    makeOrderCallback: PropTypes.func.isRequired,
    listOrder: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};
