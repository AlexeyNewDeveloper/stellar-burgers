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

const PlaceOrderButton = withModal({
  WrappedComponent: Button,
  DetailInfoComponent: OrderDetails,
});

export default function BurgerConstructor({ ingredients }) {
  const filtredIngredients = filterIngredients(ingredients, {
    bun: [],
    other: [],
  });

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      <ul className={`${styles.items}`}>
        <li className={`${styles.item} pl-8 mb-4 mr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={filtredIngredients.bun[0].name}
            price={filtredIngredients.bun[0].price}
            thumbnail={filtredIngredients.bun[0].image}
          />
        </li>
        <ul className={`${styles.items} ${styles["changing-ingredients"]}`}>
          {filtredIngredients.other.map((item) => {
            return (
              <li
                className={`${styles.item} ${styles["changing-ingredients__item"]} pl-8`}
                key={item["_id"]}
              >
                <div className={`${styles["drag-icon"]}`}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          })}
        </ul>
        <li className={`${styles.item} pl-8 mr-4 mt-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={filtredIngredients.bun[0].name}
            price={filtredIngredients.bun[0].price}
            thumbnail={filtredIngredients.bun[0].image}
          />
        </li>
      </ul>
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
          <PlaceOrderButton type="primary" size="large" htmlType="button">
            Оформить заказ
          </PlaceOrderButton>
        </div>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(propTypesForItemObj).isRequired,
};
