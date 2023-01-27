import styles from "./order-item.module.css";
import PropTypes from "prop-types";
import moment from "moment";
import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import CircleIconsList from "../circle_icons_list/circle_icons_list";
import { Link } from "react-router-dom";

export default function OrderItem({
  orderNumber,
  orderDate,
  orderName,
  orderStatus,
  totalPriceOrder,
  compositionOrder,
  idOrder,
}) {
  const dateMoment = moment(orderDate).calendar(null, {
    sameDay: "[Сегодня], HH:mm i-GMT+3",
    nextDay: "[Завтра]",
    nextWeek: "На следующей неделе",
    lastDay: "[Вчера], hh:mm i-GMT+3",
    lastWeek: "[На прошлой неделе], mm:ss i-GMT+3",
    sameElse: "DD/MM/YYYY",
  });

  React.useEffect(() => {}, []);

  return (
    <li className={styles.item}>
      <Link
        to={`/feed/${idOrder}`}
        className={styles.link_to_order}
        state={{
          order: JSON.stringify({
            number: orderNumber,
            date: dateMoment,
            name: orderName,
            status: orderStatus,
            composition: compositionOrder,
            totalPriceOrder,
            idOrder,
          }),
        }}
      >
        <div className={`${styles.item_row} ${styles.item_top_and_bottom}`}>
          <span
            className={`text text_type_digits-default ${styles.item_number_order}`}
          >
            #{orderNumber}
          </span>
          <span
            className={`text text_type_main-default text_color_inactive ${styles.item_date_order}`}
          >
            {dateMoment}
          </span>
        </div>
        <p
          className={`${styles.item_row} ${styles.title_order} text text_type_main-medium `}
        >
          {orderName}
        </p>
        <div className={`${styles.item_row} ${styles.item_top_and_bottom}`}>
          <ul className={styles.item_icons_orders}>
            {compositionOrder.map((ingredient, index) => {
              return (
                <React.Fragment key={index}>
                  <CircleIconsList
                    name={ingredient.name}
                    image={ingredient.image}
                    numberOfIngredients={compositionOrder.length}
                    index={index}
                  />
                </React.Fragment>
              );
            })}
          </ul>
          <div
            className={`text text_type_digits-default ${styles.item_price_order}`}
          >
            {totalPriceOrder}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}

OrderItem.propTypes = {
  orderNumber: PropTypes.number.isRequired,
  orderDate: PropTypes.string.isRequired,
  orderName: PropTypes.string.isRequired,
  totalPriceOrder: PropTypes.number.isRequired,
  idOrder: PropTypes.string.isRequired,
  compositionOrder: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  orderStatus: PropTypes.string.isRequired,
};
