import React from "react";
import PropTypes from "prop-types";
import styles from "./popup-for-place-order.module.css";

export default function PopupForPlaceOrder(props) {
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
        <button
          type="button"
          className={`${styles.close}`}
          onClick={props.closePopupCallback}
        ></button>
        <p className="text text_type_digits-large mb-8">034536</p>
        <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
        <div className={`${styles.icon_complete} mb-15`}></div>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
}

PopupForPlaceOrder.propTypes = {
  closePopupCallback: PropTypes.func.isRequired,
};
