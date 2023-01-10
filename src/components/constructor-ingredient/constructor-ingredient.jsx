import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-ingredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd/dist/hooks";
import {
  MOVE_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../services/actions/burgerConstructorTargetAction";
import { propTypesForItemObj } from "../../prop-types";

export default function ConstructorIngredient({ item, index }) {
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

  const handleDeleteElement = (index) => {
    dispatch({
      type: DELETE_INGREDIENT,
      deleteIndex: index,
    });
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
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleDeleteElement(index)}
      />
    </li>
  );
}

ConstructorIngredient.propTypes = {
  item: propTypesForItemObj,
  index: PropTypes.number.isRequired,
};
