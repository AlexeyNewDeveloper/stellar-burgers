import styles from "./constructor-area.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { v4 as uuidv4 } from "uuid";
import { getBurgerConstructorTargetState } from "../../services/selectors/burgerConstructorTargetStateSelector";
import { addIngredientAction } from "../../services/actions/burgerConstructorTargetAction";
import { IIngredient } from "../../types";

const ConstructorArea: React.FC = () => {
  const dispatch = useDispatch();
  const { ingredients, bun } = useSelector(getBurgerConstructorTargetState);

  const [{ isHover }, dropRef] = useDrop<
    IIngredient,
    void,
    { isHover: boolean }
  >({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      item.uuid = uuidv4();
      dispatch(addIngredientAction(item));
    },
  });
  const [{ isHoverInner }, dropInnerRef] = useDrop<
    IIngredient,
    void,
    { isHoverInner: boolean }
  >({
    accept: "constructorIngredient",
    collect: (monitor) => ({
      isHoverInner: monitor.isOver(),
    }),
    drop(item) {},
  });

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
            text={bun ? bun.name + " (верх)" : "Добавьте булку"}
            price={bun ? bun.price || 0 : 0}
            thumbnail={bun ? bun.image || "" : ""}
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
                key={item.uuid}
                item={item}
                index={index}
              />
            );
          })}
      </ul>
      <li className={`${styles.item} pl-8 mr-4 mt-4`}>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun ? bun.name + " (низ)" : "Добавьте булку"}
            price={bun ? bun.price || 0 : 0}
            thumbnail={bun ? bun.image || "" : ""}
          />
        )}
        {!bun && ingredients.length !== 0 && (
          <div className={`${styles["empty-bun-bottom"]}`}>Добавьте булку!</div>
        )}
      </li>
    </ul>
  );
};

export default ConstructorArea;
