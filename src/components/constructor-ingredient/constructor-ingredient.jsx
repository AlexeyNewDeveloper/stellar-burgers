import React from "react";
import styles from "./constructor-ingredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd/dist/hooks";
import { MOVE_INGREDIENT } from "../../services/actions/actions";

export default function ConstructorIngredient({
  item,
  index,
  handleDeleteElement,
}) {
  const elementRef = React.useRef(null);
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: "constructorIngredient",
    item: { item, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
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
      const hoverBoundingRect = elementRef.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: MOVE_INGREDIENT,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
        element: item.item,
      });

      item.index = hoverIndex;
    },
  });

  const opacity = isDrag ? "0.5" : "1";

  return (
    <li
      className={`${styles.item} ${styles["changing-ingredients__item"]} pl-8`}
      style={{ opacity }}
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
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleDeleteElement(index)}
      />
    </li>
  );
}
