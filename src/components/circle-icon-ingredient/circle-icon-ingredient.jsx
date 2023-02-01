import styles from "./circle-icon-ingredient.module.css";
import PropTypes from "prop-types";

export default function CircleIconIngredient({
  children,
  image,
  name,
  extraClass,
}) {
  return (
    <div className={`${styles.inner_circle}`}>
      <img
        className={`${styles.circle_icon} ${extraClass ? extraClass : ""}`}
        src={image}
        alt={name}
      />
      {children}
    </div>
  );
}

CircleIconIngredient.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
};
