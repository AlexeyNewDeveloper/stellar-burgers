import styles from "./order-page.module.css";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWsState } from "../../services/selectors/wsStateSelector";
import { ORDER_STATUS_DONE, ORDER_STATUS_AT_WORK } from "../../utils/constants";
import { getIngredientsState } from "../../services/selectors/getIngredientsStateSelector";
import { getIngredientsAction } from "../../services/actions/getIngredientsAction";
import CircleIconIngredient from "../../components/circle_icon_ingredient/circle_icon_ingredient";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderPage() {
  //   const dispatch = useDispatch();
  //   const { id } = useParams();
  //   const { data, wsConnectedSuccess, wsConnected, wsErrorMessage, wsError } =
  //     useSelector(getWsState);
  //   const { ingredients } = useSelector(getIngredientsState);

  const { state } = useLocation();
  const order = JSON.parse(state.order);
  const { number, date, name, status, composition, totalPriceOrder } = order;

  //   React.useEffect(() => {
  //     if (!ingredients.length) {
  //       dispatch(getIngredientsAction());
  //     }
  //   }, [ingredients.length]);

  return (
    <section className={styles.container}>
      {order && (
        <>
          <p className={`text text_type_digits-default ${styles.number_order}`}>
            #{number}
          </p>
          <h2 className={`text text_type_main-large ${styles.title}`}>
            {name}
          </h2>
          <p className={styles.status}>
            {status === ORDER_STATUS_DONE ? "Выполнен" : "В работе"}
          </p>
          <p className={`text text_type_main-medium`}>Состав:</p>
          <ul className={`${styles.order_composition_list}`}>
            {composition.map((item, index) => {
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
                    <div className={styles.price_icon}>
                      <CurrencyIcon type="primary" />
                    </div>
                  </p>
                </li>
              );
            })}
          </ul>
          <div className={styles.footer}>
            <span className={`text text_type_main-default text_color_inactive`}>
              {date}
            </span>
            <p
              className={`text text_type_digits-default ${styles.price_ingredient}`}
            >
              {totalPriceOrder}
              <div className={styles.price_icon}>
                <CurrencyIcon type="primary" />
              </div>
            </p>
          </div>
        </>
      )}
    </section>
  );
}
