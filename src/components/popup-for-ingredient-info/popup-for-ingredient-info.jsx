import React from "react";
import PropTypes from "prop-types";
import styles from "./popup-for-ingredient-info.module.css";
import { specifications } from "../../utils/constants";

export default function PopupForIngredientInfo(props) {
  const refPopup = React.useRef();
  React.useEffect(() => {
    document.addEventListener("keydown", closePopupToKey);
    refPopup.current.addEventListener("click", closePopupToOverlay);
    return () => {
      document.removeEventListener("keydown", closePopupToKey);
      refPopup.current.removeEventListener("click", closePopupToOverlay);
    };
  }, []);

  const closePopupToKey = (evt) => {
    if (evt.key === "Escape") {
      props.closePopupCallback();
    }
  };

  const closePopupToOverlay = (evt) => {
    if (!evt.target.closest(`.${styles.container}`)) {
      props.closePopupCallback();
    }
  };

  return (
    <div ref={refPopup} className={`${styles.popup}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.title_area}`}>
          <p className="text text_type_main-large">Детали ингредиента</p>
          <button
            type="button"
            className={`${styles.close}`}
            onClick={props.closePopupCallback}
          ></button>
        </div>
        <img
          src={props.data.image_large}
          alt={props.data.name}
          className={`${styles.image} mb-4`}
        />
        <p className="text text_type_main-medium mb-8">{props.data.name}</p>
        <ul className={`${styles.specifications}`}>
          {Object.keys(specifications).map((item, index) => {
            return (
              <li key={index} className={`${styles.parameter}`}>
                <p className="text text_type_main-default text_color_inactive">
                  {specifications[item]}
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {props.data[item]}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

PopupForIngredientInfo.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
  }).isRequired,
  closePopupCallback: PropTypes.func.isRequired,
};
