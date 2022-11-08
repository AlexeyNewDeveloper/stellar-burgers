import React from "react";
import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ children, onElementClick }) {
  return (
    <div className={`${styles.popup}`}>
      {children}
      <div onClick={onElementClick} className={`${styles.overlay}`}></div>
    </div>
  );
}
