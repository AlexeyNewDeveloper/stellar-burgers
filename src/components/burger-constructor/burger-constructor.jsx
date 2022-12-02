import React from "react";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { filterIngredients, getListOrder } from "../../utils/utils";
import withModal from "../hocs/withModal";
import OrderDetails from "../order-details/order-details";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import BurgerElement from "../burger-element/burger-element";
import { makeOrder } from "../../utils/burger-api";
import { useDispatch, useSelector } from "react-redux";
import { GET_INGREDIENTS_FOR_CONSTRUCTOR } from "../../services/actions/actions";

const PlaceOrderButton = withModal({
  WrappedComponent: Button,
  DetailInfoComponent: OrderDetails,
});

export default function BurgerConstructor() {
  const { ingredientsForConstructor } = useSelector(
    (state) => state.getIngredientsReducer
  );

  const filtredIngredients = React.useMemo(() => {
    return filterIngredients(ingredientsForConstructor, {
      bun: [],
      other: [],
    });
  }, [ingredientsForConstructor]);

  filtredIngredients.totalPrice = React.useMemo(() => {
    return ingredientsForConstructor.reduce((acc, current) => {
      if (current.type === "bun") {
        acc += current.price * 2;
      } else {
        acc += current.price;
      }
      return acc;
    }, 0);
  }, [ingredientsForConstructor]);

  // React.useEffect(() => {
  //   dispatch({ type: GET_INGREDIENTS_FOR_CONSTRUCTOR });
  // }, []);

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      {ingredientsForConstructor.length && (
        <BurgerElement
          bun={filtredIngredients.bun[0]}
          otherIngredients={filtredIngredients.other}
        />
      )}
      <div className={`${styles["place-order"]} mt-10`}>
        <div className={`${styles["price-area"]}`}>
          <span className={`text text_type_digits-medium mr-2`}>
            {filtredIngredients.totalPrice}
          </span>
          <div className={`${styles["icon-area"]}`}>
            <div className={`${styles.icon}`}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className="ml-10 mr-4">
          {ingredientsForConstructor && (
            <PlaceOrderButton type="primary" size="large" htmlType="button">
              Оформить заказ
            </PlaceOrderButton>
          )}
        </div>
      </div>
    </section>
  );
}
