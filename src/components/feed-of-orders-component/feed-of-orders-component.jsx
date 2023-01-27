import styles from "./feed-of-orders-component.module.css";
import React from "react";
import PropTypes from "prop-types";
import OrderItem from "../order-item/order-item";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientsState } from "../../services/selectors/getIngredientsStateSelector";
import { getIngredientsAction } from "../../services/actions/getIngredientsAction";

export default function FeedOfOrdersComponent({ orders }) {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getIngredientsState);

  React.useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredientsAction());
    }
  }, [ingredients]);

  const getIngredientById = (id) => {
    if (ingredients.length) {
      return ingredients.find((item) => item._id === id);
    }
  };

  const countTotalPriceOrder = (compositionOrder) => {
    return compositionOrder.reduce((acc, current) => {
      return (acc += current.price);
    }, 0);
  };

  const getCompositionOrder = (order) => {
    const arrayIngredients = [];
    const allIngredients = order.ingredients.reduce((acc, id) => {
      const { image, name, price } = getIngredientById(id);
      if (id in acc) {
        acc[id].quantity += 1;
      } else {
        acc[id] = {
          quantity: 1,
          image,
          name,
          price,
        };
      }
      return acc;
    }, {});
    for (const key in allIngredients) {
      arrayIngredients.push(allIngredients[key]);
    }
    return arrayIngredients;
  };

  return (
    <ul className={styles.items}>
      {ingredients.length &&
        orders.map((order, index) => {
          const compositionOrder = getCompositionOrder(order);
          return (
            <React.Fragment key={index}>
              <OrderItem
                orderNumber={order.number}
                orderDate={order.createdAt}
                orderName={order.name}
                orderStatus={order.status}
                compositionOrder={compositionOrder}
                totalPriceOrder={countTotalPriceOrder(compositionOrder)}
                idOrder={order._id}
              />
            </React.Fragment>
          );
        })}
    </ul>
  );
}

FeedOfOrdersComponent.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
