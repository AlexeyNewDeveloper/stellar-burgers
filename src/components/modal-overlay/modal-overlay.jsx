import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ children, closePopup }) {
  return (
    <div className={`${styles.popup}`}>
      {children}
      <div onClick={closePopup} className={`${styles.overlay}`}></div>
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closePopup: PropTypes.func.isRequired,
};
