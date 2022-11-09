import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

export default function Modal(props) {
  React.useEffect(() => {
    document.addEventListener("keydown", closePopupToKey);
    return () => {
      document.removeEventListener("keydown", closePopupToKey);
    };
  }, []);

  const closePopupToKey = (evt) => {
    if (evt.key === "Escape") {
      props.closePopup();
    }
  };

  return (
    <div className={`${styles.container}`}>
      <button
        type="button"
        className={`${styles.close}`}
        onClick={props.closePopup}
      ></button>
      {props.children}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closePopup: PropTypes.func.isRequired,
};
