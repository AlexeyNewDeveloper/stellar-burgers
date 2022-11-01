import React from "react";
import styles from "./navigation-menu.module.css";
import MenuItem from "../menu-item/menu-item";

export default class NavigationMenu extends React.Component {
  render() {
    return (
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4 mr-2`}>
            <MenuItem text="Конструктор" nameTab="constructor" />
          </li>
          <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
            <MenuItem text="Лента заказов" nameTab="orderFeed" />
          </li>
        </ul>
      </nav>
    );
  }
}
