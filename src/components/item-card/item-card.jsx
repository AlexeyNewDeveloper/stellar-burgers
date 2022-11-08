import React from "react";
import PropTypes from "prop-types";
import styles from "./item-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PopupForIngredientInfo from "../popup-for-ingredient-info/popup-for-ingredient-info";

export default function ItemCard(props) {
  const [state, setState] = React.useState({
    openPopupForIngredientInfo: false,
  });
  const refItemCard = React.useRef();

  React.useEffect(() => {
    refItemCard.current.addEventListener("click", openPopupForDetail);
    return () => {
      refItemCard.current.removeEventListener("click", openPopupForDetail);
    };
  }, []);

  const openPopupForDetail = () => {
    setState({ ...state, openPopupForIngredientInfo: true });
  };

  const closePopupForDetail = () => {
    setState({ ...state, openPopupForIngredientInfo: false });
  };

  return (
    <React.Fragment>
      <div ref={refItemCard} className={`${styles.item}`}>
        {props.item["_id"] === "60666c42cc7b410027a1a9b1" ? (
          <div className={`${styles.counter}`}>
            <Counter count={1} size="default" />
          </div>
        ) : (
          ""
        )}
        <img
          src={props.item.image}
          alt={props.item.name}
          className={`${styles.image} ml-4 mr-4 mb-1`}
        />
        <div className={`${styles.cost} mb-1`}>
          <span
            className={`${styles.priceNumber} text text_type_digits-default`}
          >
            {props.item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.description} text text_type_main-small`}>
          {props.item.name}
        </p>
      </div>
      {state.openPopupForIngredientInfo ? (
        <PopupForIngredientInfo
          data={props.detailDataForPopup}
          closePopupCallback={closePopupForDetail}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  detailDataForPopup: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
  }).isRequired,
};
