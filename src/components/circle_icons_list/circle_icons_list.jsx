import styles from "./circle_icons_list.module.css";
import CircleIconIngredient from "../circle_icon_ingredient/circle_icon_ingredient";
import PropTypes from "prop-types";

export default function CircleIconsList({
  image,
  name,
  numberOfIngredients,
  index,
}) {
  const styleForOverlay = { zIndex: 6 - index, left: index * 50 + "px" };
  const numberVisibleIngredients = 5;

  if (index === numberVisibleIngredients) {
    return (
      <li
        className={`${styles.circle_gradient_container} ${styles.is_last_container}`}
        style={styleForOverlay}
      >
        <CircleIconIngredient
          image={image}
          name={name}
          extraClass={styles.is_last_opacity_icon}
        >
          <span className={styles.number_after}>
            +{numberOfIngredients - index}
          </span>
        </CircleIconIngredient>
      </li>
    );
  } else if (index < numberVisibleIngredients) {
    return (
      <li
        className={`${styles.circle_gradient_container}`}
        style={styleForOverlay}
      >
        <CircleIconIngredient image={image} name={name} />
      </li>
    );
  } else {
    return false;
  }
}

CircleIconsList.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  numberOfIngredients: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
