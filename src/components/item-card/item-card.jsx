import React from "react";
import PropTypes from "prop-types";
import styles from "./item-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { propTypesForItemObj } from "../../prop-types";
import { useDrag } from "react-dnd/dist/hooks";
import { useSelector } from "react-redux";
import { countItems } from "../../utils/utils";

function ItemCard({ item, onClick }) {
  const { ingredients, bun } = useSelector(
    (state) => state.burgerConstructorTargetReducer.ingredientsForConstructor
  );

  let countedItems = {};
  if (ingredients.length || bun) {
    countedItems = countItems(ingredients, bun);
  }

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  return (
    <React.Fragment>
      <div ref={dragRef} className={`${styles.item}`} onClick={onClick}>
        {item["_id"] in countedItems ? (
          <div className={`${styles.counter}`}>
            <Counter count={countedItems[item["_id"]]} size="default" />
          </div>
        ) : (
          ""
        )}
        <img
          src={item.image}
          alt={item.name}
          className={`${styles.image} ml-4 mr-4 mb-1`}
        />
        <div className={`${styles.cost} mb-1`}>
          <span
            className={`${styles.priceNumber} text text_type_digits-default`}
          >
            {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.description} text text_type_main-small`}>
          {item.name}
        </p>
      </div>
    </React.Fragment>
  );
}

ItemCard.propTypes = {
  item: propTypesForItemObj,
  onClick: PropTypes.func.isRequired,
};

export default ItemCard;
