import styles from "./modal-overlay.module.css";

interface IModalOverlay {
  children: React.ReactNode;
  closePopup: () => void;
}

const ModalOverlay: React.FC<IModalOverlay> = ({ children, closePopup }) => {
  return (
    <div className={`${styles.popup}`}>
      {children}
      <div onClick={closePopup} className={`${styles.overlay}`}></div>
    </div>
  );
};

export default ModalOverlay;
