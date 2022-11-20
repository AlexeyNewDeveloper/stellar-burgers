import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { filterIngredients } from "../../utils/utils";
import withModal from "../hocs/withModal";
import OrderDetails from "../order-details/order-details";
import { propTypesForItemObj } from "../../prop-types";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import BurgerElement from "../burger-element/burger-element";

const PlaceOrderButton = withModal({
  WrappedComponent: Button,
  DetailInfoComponent: OrderDetails,
});

export default function BurgerConstructor() {
  const data = React.useContext(BurgerConstructorContext);
  const ingredients = data.ingredients;
  const totalPrice = data.totalPrice;

  const filtredIngredients = filterIngredients(ingredients, {
    bun: [],
    other: [],
  });

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      <BurgerElement
        bun={filtredIngredients.bun[0]}
        otherIngredients={filtredIngredients.other}
      />
      <div className={`${styles["place-order"]} mt-10`}>
        <div className={`${styles["price-area"]}`}>
          <span className={`${styles.total} text text_type_digits-medium mr-2`}>
            {totalPrice}
          </span>
          <div className={`${styles["icon-area"]}`}>
            <div className={`${styles.icon}`}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className="ml-10 mr-4">
          <PlaceOrderButton type="primary" size="large" htmlType="button">
            Оформить заказ
          </PlaceOrderButton>
        </div>
      </div>
    </section>
  );
}

// BurgerConstructor.propTypes = {
//   ingredients: PropTypes.arrayOf(propTypesForItemObj).isRequired,
// };
