import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuItem from "../menu-item/menu-item";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${styles.header} pt-4 pb-4`}>
        <nav className={styles.nav}>
          <ul className={styles.items}>
            <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4 mr-2`}>
              <MenuItem
                text="Конструктор"
                icon={<BurgerIcon type="primary" />}
              />
            </li>
            <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
              <MenuItem
                text="Лента заказов"
                icon={<ListIcon type="secondary" />}
              />
            </li>
          </ul>
        </nav>
        <div className={`${styles.logo}`}>
          <Logo />
        </div>
        <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
          <MenuItem
            text="Личный кабинет"
            icon={<ProfileIcon type="secondary" />}
          />
        </div>
      </header>
    );
  }
}

export default AppHeader;
