import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuItem from "../menu-item/menu-item";
import { NavLink } from "react-router-dom";
import { useSelector } from "../../hooks/hooks";
import { getUserState } from "../../services/selectors/userStateSelectors";

const AppHeader: React.FC = () => {
  const { user } = useSelector(getUserState);

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li
            className={`${styles.item} ${styles.primary_item} pl-5 pr-5 pt-4 pb-4 mr-2`}
          >
            <NavLink
              to="/"
              className={`${styles["item-link"]}  text text_type_main-default`}
            >
              {({ isActive }) => (
                <MenuItem
                  text="Конструктор"
                  activeClassName={
                    isActive ? `${styles["item-text-active"]}` : ""
                  }
                  icon={
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  }
                />
              )}
            </NavLink>
          </li>
          <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
            <NavLink
              to="/feed"
              className={`${styles["item-link"]}  text text_type_main-default`}
            >
              {({ isActive }) => (
                <MenuItem
                  text="Лента заказов"
                  activeClassName={
                    isActive ? `${styles["item-text-active"]}` : ""
                  }
                  icon={<ListIcon type={isActive ? "primary" : "secondary"} />}
                />
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`${styles.logo}`}>
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
        <NavLink
          to="/profile"
          className={`${styles["item-link"]}  text text_type_main-default`}
        >
          {({ isActive }) => (
            <MenuItem
              text="Личный кабинет"
              activeClassName={
                user ? (isActive ? `${styles["item-text-active"]}` : "") : ""
              }
              icon={
                <ProfileIcon
                  type={user && isActive ? "primary" : "secondary"}
                />
              }
            />
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
