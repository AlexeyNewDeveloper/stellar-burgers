import styles from "./feed-of-orders-component.module.css";
import React from "react";
import OrderItem from "../order-item/order-item";
import { useLocation, Link } from "react-router-dom";
import moment from "moment";
import { getCompositionOrder } from "../../utils/utils";
import { countTotalPriceOrder } from "../../utils/utils";
import { IngredientsContext } from "../app/App";
import { IOrder } from "../../types";

interface IFeedOfOrdersComponent {
  orders: Array<IOrder>;
  extraClassContainer: string;
  showStatus?: boolean;
}

const FeedOfOrdersComponent: React.FC<IFeedOfOrdersComponent> = ({
  orders,
  extraClassContainer,
  showStatus,
}) => {
  const { ingredients } = React.useContext(IngredientsContext);
  const location = useLocation();
  const getDateMoment = (orderDate: string): string =>
    moment(orderDate).calendar(null, {
      sameDay: "[Сегодня], HH:mm i-GMT+3",
      nextDay: "[Завтра]",
      nextWeek: "На следующей неделе",
      lastDay: "[Вчера], hh:mm i-GMT+3",
      lastWeek: "[На прошлой неделе], mm:ss i-GMT+3",
      sameElse: "DD/MM/YYYY",
    });

  return (
    <ul
      className={`${styles.items} ${
        extraClassContainer ? extraClassContainer : ""
      }`}
    >
      {ingredients.length &&
        orders.map((order, index) => {
          const { arrayIngredientsInOrder, arrayCompositionOrder } =
            getCompositionOrder(order, ingredients);
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
                  backgroundLocation: location,
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
};

export default FeedOfOrdersComponent;
