import React from "react";
import styles from "./place-order.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default class PlaceOrder extends React.Component {
  render() {
    return (
      <div className={`${styles["place-order"]} mt-10`}>
        <div className={`${styles["price-area"]}`}>
          <span className={`${styles.total} text text_type_digits-medium mr-2`}>
            610
          </span>
          <div className={`${styles["icon-area"]}`}>
            <div className={`${styles.icon}`}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className="ml-10 mr-4">
          <Button type="primary" size="large" htmlType="button">
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }
}
