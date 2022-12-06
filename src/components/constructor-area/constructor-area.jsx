import styles from "./constructor-area.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../services/actions/actions";
// import update from "immutability-helper";

export default function ConstructorArea() {
  const dispatch = useDispatch();
  const { ingredients, bun } = useSelector(
    (state) => state.burgerConstructorTargetReducer.ingredientsForConstructor
  );

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
  const [{ isHoverInner }, dropInnerRef] = useDrop({
    accept: "constructorIngredient",
    collect: (monitor) => ({
      isHoverInner: monitor.isOver(),
    }),
    drop(item) {},
  });

  const handleDeleteElement = (index) => {
    dispatch({
      type: DELETE_INGREDIENT,
      deleteIndex: index,
    });
  };

  return (
    <ul
      ref={dropRef}
      className={`${styles.items}`}
      style={{ outlineColor: isHover ? "red" : "transparent" }}
    >
      <li className={`${styles.item} pl-8 mb-4 mr-4`}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun ? bun.name : "Добавьте булку"}
            price={bun ? bun.price : 0}
            thumbnail={bun ? bun.image : null}
          />
        )}
        {!bun && ingredients.length !== 0 && (
          <div className={`${styles["empty-bun-top"]}`}>Добавьте булку!</div>
        )}
      </li>
      <ul
        className={`${styles["items-inner"]} ${styles["changing-ingredients"]}`}
        ref={dropInnerRef}
        style={{ outlineColor: isHoverInner ? "green" : "transparent" }}
      >
        {ingredients.length !== 0 &&
          ingredients.map((item, index) => {
            return (
              <ConstructorIngredient
                key={index}
                item={item}
                index={index}
                handleDeleteElement={handleDeleteElement}
              />
            );
          })}
      </ul>
      <li className={`${styles.item} pl-8 mr-4 mt-4`}>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun ? bun.name : "Добавьте булку"}
            price={bun ? bun.price : 0}
            thumbnail={bun ? bun.image : null}
          />
        )}
        {!bun && ingredients.length !== 0 && (
          <div className={`${styles["empty-bun-bottom"]}`}>Добавьте булку!</div>
        )}
      </li>
    </ul>
  );
}
