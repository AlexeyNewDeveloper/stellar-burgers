import styles from "./circle-icon-ingredient.module.css";

interface ICircleIconIngredient {
  children?: React.ReactNode;
  image: string;
  name: string;
  extraClass?: string;
}

const CircleIconIngredient: React.FC<ICircleIconIngredient> = ({
  children,
  image,
  name,
  extraClass,
}) => {
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
};

export default CircleIconIngredient;
