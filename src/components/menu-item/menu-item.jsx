import PropTypes from "prop-types";
import styles from "./menu-item.module.css";

export default function MenuItem(props) {
  return (
    <>
      <div className={`${styles.icons} mr-2`}>{props.icon}</div>
      <span className={`${styles["item-text"]}`}>{props.text}</span>
    </>
  );
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
