import React from "react";
import PropTypes from "prop-types";
import styles from "./item-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { propTypesForItemObj } from "../../prop-types";

function ItemCard({ item, onClick }) {
  return (
    <React.Fragment>
      <div className={`${styles.item}`} onClick={onClick}>
        {item["_id"] === "60666c42cc7b410027a1a9b1" ? (
          <div className={`${styles.counter}`}>
            <Counter count={1} size="default" />
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
