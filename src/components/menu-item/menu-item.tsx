import styles from "./menu-item.module.css";

interface IMenuItem {
  text: string;
  icon: JSX.Element;
  activeClassName: string;
}

const MenuItem: React.FC<IMenuItem> = ({ text, icon, activeClassName }) => {
  return (
    <>
      <div className={`${styles.icons} mr-2`}>{icon}</div>
      <span className={`${styles["item-text"]} ${activeClassName}`}>
        {text}
      </span>
    </>
  );
};

export default MenuItem;
