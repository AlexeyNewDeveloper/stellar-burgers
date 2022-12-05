import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-area.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { filterIngredients } from "../../utils/utils";
import { propTypesForItemObj } from "../../prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../services/actions/actions";

export default function ConstructorArea() {
  const dispatch = useDispatch();
  const { ingredients, bun } = useSelector(
    (state) => state.burgerConstructorTargetReducer.ingredientsForConstructor
  );
  const haveAnyIngredient = ingredients.length || bun;
  // const filtredIngredients = React.useMemo(() => {
  //   return filterIngredients(ingredients, {
  //     bun: [],
  //     other: [],
  //   });
  // }, [ingredients]);

  // const bunObject = filtredIngredients.bun[0];

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: item,
      });
    },
  });

  const handleDeleteElement = (index) => {
    dispatch({
      type: DELETE_INGREDIENT,
      deleteIndex: index,
    });
  };

  const borderColor = isHover ? "red" : "transparent";
  return (
    <ul ref={dropRef} className={`${styles.items}`} style={{ borderColor }}>
      <li className={`${styles.item} pl-8 mb-4 mr-4`}>
        {haveAnyIngredient && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun ? bun.name : "Добавьте булку"}
            price={bun ? bun.price : 0}
            thumbnail={bun ? bun.image : null}
          />
        )}
      </li>
      <ul
        className={`${styles["items-inner"]} ${styles["changing-ingredients"]}`}
      >
        {ingredients.length !== 0 &&
          ingredients.map((item, index) => {
            return (
              <li
                className={`${styles.item} ${styles["changing-ingredients__item"]} pl-8`}
                key={index}
              >
                <div className={`${styles["drag-icon"]}`}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={() => handleDeleteElement(index)}
                />
              </li>
            );
          })}
      </ul>
      <li className={`${styles.item} pl-8 mr-4 mt-4`}>
        {haveAnyIngredient && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun ? bun.name : "Добавьте булку"}
            price={bun ? bun.price : 0}
            thumbnail={bun ? bun.image : null}
          />
        )}
      </li>
    </ul>
  );
}
