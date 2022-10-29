import React from "react";
import styles from "./app-header.module.css";
import {
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationMenu from "../navigation-menu/navigation-menu";
import MenuItem from "../menu-item/menu-item";

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItemsActive: {
                constructor: true,
                account: false,
                orderFeed: false,
            },
        };
    }

    setActiveTab = (nameTab) => {
        const menuItemsActive = { ...this.state.menuItemsActive };
        for (let prop in menuItemsActive) {
            if (nameTab === prop) {
                menuItemsActive[prop] = true;
            } else {
                menuItemsActive[prop] = false;
            }
        }
        this.setState({ menuItemsActive: menuItemsActive });
    };

    render() {
        return (
            <header className={`${styles.header} pt-4 pb-4`}>
                <NavigationMenu
                    tabsProp={{
                        constructor: this.state.menuItemsActive.constructor,
                        orderFeed: this.state.menuItemsActive.orderFeed,
                        funcActiveTab: this.setActiveTab,
                    }}
                />
                <div className={`${styles.logo} ${styles["border_dashed"]}`}>
                    <Logo />
                </div>
                <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
                    <MenuItem
                        text="Личный кабинет"
                        icon={
                            <ProfileIcon
                                type={
                                    this.state.menuItemsActive.account
                                        ? "primary"
                                        : "secondary"
                                }
                            />
                        }
                        nameTab="account"
                        funcActiveTab={this.setActiveTab}
                        activeTab={this.state.menuItemsActive.account}
                    />
                </div>
            </header>
        );
    }
}

export default AppHeader;
