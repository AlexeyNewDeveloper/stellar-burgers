import styles from "./app-header.module.css";
import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuItem from "../menu-item/menu-item";
import { NavLink, useLocation } from "react-router-dom";

function AppHeader() {
  const location = useLocation();

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li
            className={`${styles.item} ${styles.primary_item} pl-5 pr-5 pt-4 pb-4 mr-2`}
          >
            <NavLink
              to="/"
              exact={true}
              className={`${styles["item-link"]}  text text_type_main-default`}
              activeClassName={`${styles["item-text-active"]}`}
            >
              <MenuItem
                text="Конструктор"
                icon={
                  <BurgerIcon
                    type={location.pathname === "/" ? "primary" : "secondary"}
                  />
                }
              />
            </NavLink>
          </li>
          <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
            <NavLink
              to="/nopath"
              className={`${styles["item-link"]}  text text_type_main-default`}
              activeClassName={`${styles["item-text-active"]}`}
            >
              <MenuItem
                text="Лента заказов"
                icon={<ListIcon type="secondary" />}
              />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`${styles.logo}`}>
        <Logo />
      </div>
      <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
        <NavLink
          to="/profile"
          className={`${styles["item-link"]}  text text_type_main-default`}
          activeClassName={`${styles["item-text-active"]}`}
        >
          <MenuItem
            text="Личный кабинет"
            icon={
              <ProfileIcon
                type={
                  location.pathname === "/profile" ? "primary" : "secondary"
                }
              />
            }
          />
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
