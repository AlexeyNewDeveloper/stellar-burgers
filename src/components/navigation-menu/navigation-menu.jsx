import React from "react";
import styles from "./navigation-menu.module.css";
import MenuItem from "../menu-item/menu-item";
import {
    BurgerIcon,
    ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default class NavigationMenu extends React.Component {
    render() {
        return (
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
        );
    }
}
