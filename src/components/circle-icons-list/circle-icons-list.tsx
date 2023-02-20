import styles from "./circle-icons-list.module.css";
import CircleIconIngredient from "../circle-icon-ingredient/circle-icon-ingredient";

interface ICircleIconsList {
  image: string;
  name: string;
  numberOfIngredients: number;
  index: number;
}

const CircleIconsList: React.FC<ICircleIconsList> = ({
  image,
  name,
  numberOfIngredients,
  index,
}) => {
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
    return null;
  }
};

export default CircleIconsList;
