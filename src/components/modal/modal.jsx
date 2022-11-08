import React from "react";
import styles from "./modal.module.css";

export default function Modal(props) {
  return (
    <div className={`${styles.container}`}>
      <button
        type="button"
        className={`${styles.close}`}
        onClick={props.onClick}
      ></button>
      {props.children}
    </div>
  );
}
