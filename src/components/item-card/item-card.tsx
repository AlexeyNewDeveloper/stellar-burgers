import React from "react";
import styles from "./item-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd/dist/hooks";
import { useSelector } from "../../hooks/hooks";
import { countItems } from "../../utils/utils";
import { getBurgerConstructorTargetState } from "../../services/selectors/burgerConstructorTargetStateSelector";
import { IIngredient } from "../../types";

interface IItemCard {
  item: IIngredient;
}

const ItemCard: React.FC<IItemCard> = ({ item }) => {
  const { ingredients, bun } = useSelector(getBurgerConstructorTargetState);

  const countedItems =
    ingredients.length || bun ? countItems(ingredients, bun) : {};

  // useMemo работает с задержкой

  // const countedItems = React.useMemo(() => {
  //   return ingredients.length || bun ? countItems(ingredients, bun) : {};
  // }, [ingredients, bun]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  return (
    <React.Fragment>
      <div ref={dragRef} className={`${styles.item}`}>
        {item["_id"] && item["_id"] in countedItems ? (
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
};

export default ItemCard;
