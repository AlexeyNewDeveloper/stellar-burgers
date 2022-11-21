import React from "react";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { filterIngredients } from "../../utils/utils";
import withModal from "../hocs/withModal";
import OrderDetails from "../order-details/order-details";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import BurgerElement from "../burger-element/burger-element";
import { makeOrder } from "../../utils/burger-api";

const PlaceOrderButton = withModal({
  WrappedComponent: Button,
  DetailInfoComponent: OrderDetails,
});

function reducer(state, action) {
  if (action.totalPrice) {
    const totalPrice = state.ingredients.reduce((acc, current) => {
      if (current.type === "bun") {
        acc += current.price * 2;
      } else {
        acc += current.price;
      }
      return acc;
    }, 0);
    return { ...state, totalPrice: totalPrice };
  }
}

export default function BurgerConstructor() {
  const data = React.useContext(BurgerConstructorContext);
  const [state, dispatch] = React.useReducer(reducer, data);

  const ingredients = data.ingredients;
  const orderObject = {
    makeOrderCallback: makeOrder,
    listOrder: data.listOrder,
  };

  const filtredIngredients = React.useMemo(() => {
    return filterIngredients(ingredients, {
      bun: [],
      other: [],
    });
  }, [ingredients]);

  React.useEffect(() => {
    dispatch({ totalPrice: true });
  }, []);

  return (
    <section className={`${styles.section} pt-25 pl-4`}>
      <BurgerElement
        bun={filtredIngredients.bun[0]}
        otherIngredients={filtredIngredients.other}
      />
      <div className={`${styles["place-order"]} mt-10`}>
        <div className={`${styles["price-area"]}`}>
          <span className={`${styles.total} text text_type_digits-medium mr-2`}>
            {state.totalPrice}
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
            orderObject={orderObject}
          >
            Оформить заказ
          </PlaceOrderButton>
        </div>
      </div>
    </section>
  );
}
