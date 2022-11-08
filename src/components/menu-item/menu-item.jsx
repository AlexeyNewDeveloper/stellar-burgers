import React from "react";
import PropTypes from "prop-types";
import styles from "./menu-item.module.css";

export default function MenuItem(props) {
  return (
    <a
      href="/"
      className={`${styles["item-link"]}  text text_type_main-default`}
    >
      <div className={`${styles.icons} mr-2`}>{props.icon}</div>
      <span className={`${styles["border_dashed"]} ${styles["item-text"]}`}>
        {props.text}
      </span>
    </a>
  );
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
