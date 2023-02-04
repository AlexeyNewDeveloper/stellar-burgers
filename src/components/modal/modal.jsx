import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

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
      <div className={`${styles.close}`}>
        <CloseIcon type="primary" onClick={closePopup} />
      </div>

      {children}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closePopup: PropTypes.func.isRequired,
};
