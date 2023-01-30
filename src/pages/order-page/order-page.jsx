import styles from "./order-page.module.css";
import React from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { ORDER_STATUS_DONE } from "../../utils/constants";
import CircleIconIngredient from "../../components/circle_icon_ingredient/circle_icon_ingredient";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { getWsState } from "../../services/selectors/wsStateSelector";
import { wsInit } from "../../services/actions/wsAction";
import { getIngredientsState } from "../../services/selectors/getIngredientsStateSelector";
import { getIngredientsAction } from "../../services/actions/getIngredientsAction";
import { getCompositionOrder } from "../../utils/utils";
import { countTotalPriceOrder } from "../../utils/utils";

export default function OrderPage({ modal }) {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector(getWsState);
  const { ingredients } = useSelector(getIngredientsState);
  const { id } = useParams();
  let order = null;
  let compositionOrder = null;
  let totalPriceOrder = null;

  const getOrderById = (id) => {
    return data.orders.find((item) => item._id === id);
  };

  React.useEffect(() => {
    if (!order) {
      if (!data) {
        dispatch(wsInit());
      }
    }
    if (!ingredients.length) {
      dispatch(getIngredientsAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, ingredients.length]);

  if (state) {
    order = JSON.parse(state.order);
    compositionOrder = order.composition;
    totalPriceOrder = order.totalPriceOrder;
  } else if (data) {
    order = getOrderById(id);
    compositionOrder = getCompositionOrder(
      order,
      ingredients
    ).arrayCompositionOrder;
    totalPriceOrder = countTotalPriceOrder(compositionOrder);
  }

  return (
    <section
      className={`${styles.container} ${modal && styles.container_modal}`}
    >
      {order && ingredients.length && (
        <>
          <p
            className={`text text_type_digits-default ${styles.number_order} ${
              modal && styles.number_order_modal
            }`}
          >
            #{order.number}
          </p>
          <h2 className={`text text_type_main-large ${styles.title}`}>
            {order.name}
          </h2>
          <p className={styles.status}>
            {order.status === ORDER_STATUS_DONE ? "Выполнен" : "В работе"}
          </p>
          <p className={`text text_type_main-medium`}>Состав:</p>
          <ul
            className={`${styles.order_composition_list} ${
              modal && styles.order_composition_list_modal
            }`}
          >
            {compositionOrder.map((item, index) => {
              return (
                <li key={index} className={styles.order_composition_item}>
                  <div className={`${styles.circle_gradient_container}`}>
                    <CircleIconIngredient name={item.name} image={item.image} />
                  </div>
                  <p
                    className={`text text_type_main-default ${styles.title_ingredient}`}
                  >
                    {item.name}
                  </p>
                  <p
                    className={`text text_type_digits-default ${styles.price_ingredient}`}
                  >
                    {item.quantity} x {item.price}
                    <span className={styles.price_icon}>
                      <CurrencyIcon type="primary" />
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
          <div className={styles.footer}>
            <span className={`text text_type_main-default text_color_inactive`}>
              {order.date}
            </span>
            <p
              className={`text text_type_digits-default ${styles.price_ingredient}`}
            >
              {totalPriceOrder}
              <span className={styles.price_icon}>
                <CurrencyIcon type="primary" />
              </span>
            </p>
          </div>
        </>
      )}
    </section>
  );
}

OrderPage.propTypes = {
  modal: PropTypes.bool,
};
