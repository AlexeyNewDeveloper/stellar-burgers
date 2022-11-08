import React from "react";
import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ children, onClick }) {
  return (
    <div className={`${styles.popup}`}>
      {children}
      <div onClick={onClick} className={`${styles.overlay}`}></div>
    </div>
  );
}
