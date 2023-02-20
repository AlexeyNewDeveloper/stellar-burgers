import React from "react";
import styles from "./constructor-ingredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../hooks/hooks";
import { useDrop, useDrag } from "react-dnd/dist/hooks";
import {
  deleteIngredientAction,
  moveIngredientAction,
} from "../../services/actions/burgerConstructorTargetAction";
import { IIngredient } from "../../types";
import { Identifier } from "dnd-core";

interface IConstructorIngredient {
  item: IIngredient;
  index: number;
}

const ConstructorIngredient: React.FC<IConstructorIngredient> = ({
  item,
  index,
}) => {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag<
    IConstructorIngredient,
    void,
    { isDrag: boolean }
  >({
    type: "constructorIngredient",
    item: { item, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop<
    IConstructorIngredient,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "constructorIngredient",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      let hoverMiddleY: number;
      let hoverClientY: number;
      const hoverBoundingRect = elementRef.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      if (clientOffset && hoverBoundingRect) {
        hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }
      dispatch(moveIngredientAction(dragIndex, hoverIndex, item.item));

      item.index = hoverIndex;
    },
  });

  const handleDeleteElement = (index: number): void => {
    dispatch(deleteIngredientAction(index));
  };

  return (
    <li
      className={`${styles.item} ${styles["changing-ingredients__item"]} pl-8`}
      style={{ opacity: isDrag ? "0.5" : "1" }}
      ref={(el) => {
        dragRef(el);
        dropRef(el);
        elementRef.current = el;
      }}
      data-handler-id={handlerId}
    >
      <div className={`${styles["drag-icon"]}`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name || ""}
        price={item.price || 0}
        thumbnail={item.image || ""}
        handleClose={() => handleDeleteElement(index)}
      />
    </li>
  );
};

export default ConstructorIngredient;
