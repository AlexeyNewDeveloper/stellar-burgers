import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

export default function Modal({ closePopup, children }) {
  React.useEffect(() => {
    const closePopupToKey = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };
    document.addEventListener("keydown", closePopupToKey);
    return () => {
      document.removeEventListener("keydown", closePopupToKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.container}`}>
      <button
        type="button"
        className={`${styles.close}`}
        onClick={closePopup}
      ></button>
      {children}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closePopup: PropTypes.func.isRequired,
};
