import React from "react";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import withModal from "../hocs/withModal";
import OrderDetails from "../order-details/order-details";
import ConstructorArea from "../constructor-area/constructor-area";
import { useSelector } from "react-redux";

const PlaceOrderButton = withModal({
  WrappedComponent: Button,
  DetailInfoComponent: OrderDetails,
});

export default function BurgerConstructor() {
  const { totalPrice, bun } = useSelector(
    (state) => state.burgerConstructorTargetReducer.ingredientsForConstructor
  );

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      <ConstructorArea />
      <div className={`${styles["place-order"]} mt-10`}>
        <div className={`${styles["price-area"]}`}>
          <span className={`text text_type_digits-medium mr-2`}>
            {totalPrice}
          </span>
          <div className={`${styles["icon-area"]}`}>
            <div className={`${styles.icon}`}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className="ml-10 mr-4">
          <PlaceOrderButton
            type="primary"
            size="large"
            htmlType="button"
            disabled={!totalPrice || !bun}
          >
            Оформить заказ
          </PlaceOrderButton>
        </div>
      </div>
    </section>
  );
}
