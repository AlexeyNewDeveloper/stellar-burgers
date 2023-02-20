import React from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal {
  closePopup: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ closePopup, children }) => {
  React.useEffect(() => {
    const closePopupToKey = (evt: KeyboardEvent) => {
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
};

export default Modal;
