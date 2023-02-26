import styles from "./order-item.module.css";
import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CircleIconsList from "../circle-icons-list/circle-icons-list";
import { ORDER_STATUS_DONE, ORDER_STATUS_AT_WORK } from "../../utils/constants";
import { IIngredient } from "../../types";

interface IOrderItem {
  orderNumber: number;
  orderDate: string;
  orderName: string;
  orderStatus: string;
  totalPriceOrder: number;
  arrayIngredientsInOrder: Array<IIngredient>;
  showStatus?: boolean;
}

const OrderItem: React.FC<IOrderItem> = ({
  orderNumber,
  orderDate,
  orderName,
  orderStatus,
  totalPriceOrder,
  arrayIngredientsInOrder,
  showStatus,
}) => {
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
                  name={ingredient.name || ""}
                  image={ingredient.image || ""}
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
};

export default OrderItem;
