import styles from "./order-page.module.css";
import React from "react";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { ORDER_STATUS_DONE } from "../../utils/constants";
import CircleIconIngredient from "../../components/circle-icon-ingredient/circle-icon-ingredient";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { getWsState } from "../../services/selectors/wsStateSelector";
import { wsInit } from "../../services/actions/wsAction";
import { getIngredientsState } from "../../services/selectors/getIngredientsStateSelector";
import { getIngredientsAction } from "../../services/actions/getIngredientsAction";
import { getCompositionOrder } from "../../utils/utils";
import { countTotalPriceOrder } from "../../utils/utils";
import { getUserWsState } from "../../services/selectors/wsUserStateSelector";
import { wsUserInit } from "../../services/actions/wsUserAction";
import { getOrderById } from "../../utils/utils";
import { wsConnectionClosed } from "../../services/actions/wsAction";
import { wsUserConnectionClosed } from "../../services/actions/wsUserAction";
import { IOrder } from "../../types";
import { IcompositionOrder, IcompositionIngredient } from "../../utils/utils";

interface IOrderPage {
  modal?: boolean;
}

interface IOrderObj {
  order: IOrder;
  compositionOrder: Array<IcompositionIngredient>;
  totalPriceOrder: number;
}

const OrderPage: React.FC<IOrderPage> = ({ modal }) => {
  const matchUserLink = useMatch("/profile/orders/:id");
  const matchFeedLink = useMatch("/feed/:id");
  const { state } = useLocation();
  const [orderObj, setOrderObj] = React.useState<IOrderObj>();
  const dispatch = useDispatch();
  const { data } = useSelector(
    matchFeedLink ? getWsState : matchUserLink ? getUserWsState : getWsState
  );
  const { ingredients } = useSelector(getIngredientsState);
  const { id } = useParams();

  React.useEffect(() => {
    if (!state) {
      if (matchUserLink) {
        dispatch(wsUserInit());
      }
      if (matchFeedLink) {
        dispatch(wsInit());
      }
    }
    if (state) {
      setOrderObj({
        order: JSON.parse(state.order),
        compositionOrder: JSON.parse(state.order).composition,
        totalPriceOrder: JSON.parse(state.order).totalPriceOrder,
      });
    }
    return () => {
      if (!state) {
        if (matchUserLink) {
          dispatch(wsUserConnectionClosed());
        }
        if (matchFeedLink) {
          dispatch(wsConnectionClosed());
        }
      }
    };
  }, []);

  React.useEffect(() => {
    if (
      !state &&
      data &&
      data.orders?.length &&
      ingredients.length &&
      !orderObj &&
      id
    ) {
      let order = getOrderById(id, data.orders);
      if (order) {
        let compositionOrder = getCompositionOrder(
          order,
          ingredients
        ).arrayCompositionOrder;
        let totalPriceOrder = countTotalPriceOrder(compositionOrder);
        setOrderObj({
          order,
          compositionOrder,
          totalPriceOrder,
        });
      }
    }
  }, [data, ingredients.length]);

  return (
    <section
      className={`${styles.container} ${modal && styles.container_modal}`}
    >
      {orderObj && (
        <>
          <p
            className={`text text_type_digits-default ${styles.number_order} ${
              modal && styles.number_order_modal
            }`}
          >
            #{orderObj.order.number}
          </p>
          <h2 className={`text text_type_main-large ${styles.title}`}>
            {orderObj.order.name}
          </h2>
          <p className={styles.status}>
            {orderObj.order.status === ORDER_STATUS_DONE
              ? "Выполнен"
              : "В работе"}
          </p>
          <p className={`text text_type_main-medium`}>Состав:</p>
          <ul
            className={`${styles.order_composition_list} ${
              modal && styles.order_composition_list_modal
            }`}
          >
            {orderObj.compositionOrder.map((item, index) => {
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
              {orderObj.order.date}
            </span>
            <p
              className={`text text_type_digits-default ${styles.price_ingredient}`}
            >
              {orderObj.totalPriceOrder}
              <span className={styles.price_icon}>
                <CurrencyIcon type="primary" />
              </span>
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default OrderPage;
