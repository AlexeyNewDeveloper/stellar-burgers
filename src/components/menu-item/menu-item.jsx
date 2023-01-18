import PropTypes from "prop-types";
import styles from "./menu-item.module.css";

export default function MenuItem({ text, icon, activeClassName }) {
  return (
    <>
      <div className={`${styles.icons} mr-2`}>{icon}</div>
      <span className={`${styles["item-text"]} ${activeClassName}`}>
        {text}
      </span>
    </>
  );
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  activeClassName: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    .isRequired,
};
