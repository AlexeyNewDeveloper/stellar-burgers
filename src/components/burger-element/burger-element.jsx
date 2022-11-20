import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-element.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerElement({ bun, otherIngredients }) {
  return (
    <ul className={`${styles.items}`}>
      <li className={`${styles.item} pl-8 mb-4 mr-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
        />
      </li>
      <ul className={`${styles.items} ${styles["changing-ingredients"]}`}>
        {otherIngredients.map((item) => {
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
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
        />
      </li>
    </ul>
  );
}
