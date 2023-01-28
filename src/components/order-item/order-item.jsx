import styles from "./order-item.module.css";
import PropTypes from "prop-types";
import moment from "moment";
import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import CircleIconsList from "../circle_icons_list/circle_icons_list";
import {
  ORDER_STATUS_DONE,
  ORDER_STATUS_AT_WORK,
  ORDER_STATUS_CREATED,
} from "../../utils/constants";

export default function OrderItem({
  orderNumber,
  orderDate,
  orderName,
  orderStatus,
  totalPriceOrder,
  arrayIngredientsInOrder,
  showStatus,
}) {
  React.useEffect(() => {}, []);

  const orderStatusText =
    orderStatus === ORDER_STATUS_DONE
      ? "Выполнен"
      : orderStatus === ORDER_STATUS_AT_WORK
      ? "Готовится"
      : "Создан";

  return (
    <>
      <div className={`${styles.item_row} ${styles.item_top_and_bottom}`}>
        <span
          className={`text text_type_digits-default ${styles.item_number_order}`}
        >
          #{orderNumber}
        </span>
        <span
          className={`text text_type_main-default text_color_inactive ${styles.item_date_order}`}
        >
          {orderDate}
        </span>
      </div>
      <div className={styles.item_row}>
        <p className={` ${styles.title_order} text text_type_main-medium `}>
          {orderName}
        </p>
        {showStatus && (
          <p
            className={`${styles.status} ${
              orderStatus === ORDER_STATUS_DONE ? styles.status_color : ""
            }`}
          >
            {orderStatusText}
          </p>
        )}
      </div>
      <div className={`${styles.item_row} ${styles.item_top_and_bottom}`}>
        <ul className={styles.item_icons_orders}>
          {arrayIngredientsInOrder.map((ingredient, index) => {
            return (
              <React.Fragment key={index}>
                <CircleIconsList
                  name={ingredient.name}
                  image={ingredient.image}
                  numberOfIngredients={arrayIngredientsInOrder.length}
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
    </>
  );
}

OrderItem.propTypes = {
  orderNumber: PropTypes.number.isRequired,
  orderDate: PropTypes.string.isRequired,
  orderName: PropTypes.string.isRequired,
  totalPriceOrder: PropTypes.number.isRequired,
  orderStatus: PropTypes.string.isRequired,
  showStatus: PropTypes.bool,
};
