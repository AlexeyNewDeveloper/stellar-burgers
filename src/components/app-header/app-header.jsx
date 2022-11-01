import React from "react";
import styles from "./app-header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationMenu from "../navigation-menu/navigation-menu";
import MenuItem from "../menu-item/menu-item";

class AppHeader extends React.Component {
    render() {
        return (
            <header className={`${styles.header} pt-4 pb-4`}>
                <NavigationMenu />
                <div className={`${styles.logo}`}>
                    <Logo />
                </div>
                <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
                    <MenuItem text="Личный кабинет" nameTab="account" />
                </div>
            </header>
        );
    }
}

export default AppHeader;
