import styles from "./circle_icon_ingredient.module.css";

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
