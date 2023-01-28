import styles from "./feed-of-orders-component.module.css";
import React from "react";
import PropTypes from "prop-types";
import OrderItem from "../order-item/order-item";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientsState } from "../../services/selectors/getIngredientsStateSelector";
import { getIngredientsAction } from "../../services/actions/getIngredientsAction";
import { useLocation, Link } from "react-router-dom";
import moment from "moment";

export default function FeedOfOrdersComponent({
  orders,
  extraClassContainer,
  showStatus,
}) {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getIngredientsState);
  const location = useLocation();
  const getDateMoment = (orderDate) =>
    moment(orderDate).calendar(null, {
      sameDay: "[Сегодня], HH:mm i-GMT+3",
      nextDay: "[Завтра]",
      nextWeek: "На следующей неделе",
      lastDay: "[Вчера], hh:mm i-GMT+3",
      lastWeek: "[На прошлой неделе], mm:ss i-GMT+3",
      sameElse: "DD/MM/YYYY",
    });

  React.useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredientsAction());
    }
  }, [ingredients]);

  const getIngredientById = (id) => {
    if (ingredients.length) {
      return ingredients.find((item) => item._id === id);
    }
  };

  const countTotalPriceOrder = (compositionOrder) => {
    return compositionOrder.reduce((acc, current) => {
      return (acc += current.price);
    }, 0);
  };

  const getCompositionOrder = (order) => {
    const arrayIngredientsInOrder = [];
    const arrayCompositionOrder = [];
    const compositionOrder = order.ingredients.reduce((acc, id) => {
      const { image, name, price, _id } = getIngredientById(id);
      arrayIngredientsInOrder.push({ image, name, price, _id });
      if (id in acc) {
        acc[id].quantity += 1;
      } else {
        acc[id] = {
          quantity: 1,
          image,
          name,
          price,
        };
      }
      return acc;
    }, {});
    for (const key in compositionOrder) {
      arrayCompositionOrder.push(compositionOrder[key]);
    }
    return { arrayIngredientsInOrder, arrayCompositionOrder };
  };

  return (
    <ul
      className={`${styles.items} ${
        extraClassContainer ? extraClassContainer : ""
      }`}
    >
      {ingredients.length &&
        orders.map((order, index) => {
          const { arrayIngredientsInOrder, arrayCompositionOrder } =
            getCompositionOrder(order);
          const date = getDateMoment(order.createdAt);
          const totalPriceOrder = countTotalPriceOrder(arrayIngredientsInOrder);
          return (
            <li
              key={index}
              className={`${styles.item} ${
                showStatus && styles.item_with_status
              }`}
            >
              <Link
                to={`${location.pathname}/${order._id}`}
                className={styles.link_to_order}
                state={{
                  order: JSON.stringify({
                    number: order.number,
                    date: date,
                    name: order.name,
                    status: order.status,
                    composition: arrayCompositionOrder,
                    totalPriceOrder: totalPriceOrder,
                  }),
                }}
              >
                <OrderItem
                  orderNumber={order.number}
                  orderDate={date}
                  orderName={order.name}
                  orderStatus={order.status}
                  arrayIngredientsInOrder={arrayIngredientsInOrder}
                  totalPriceOrder={totalPriceOrder}
                  showStatus={showStatus}
                />
              </Link>
            </li>
          );
        })}
    </ul>
  );
}

FeedOfOrdersComponent.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  extraClassContainer: PropTypes.string,
  showStatus: PropTypes.bool,
};
