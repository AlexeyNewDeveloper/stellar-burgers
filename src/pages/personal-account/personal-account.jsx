import styles from "./personal-account.module.css";
import {
  PasswordInput,
  Input,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "../profile/profile";
import OrderHistory from "../order-history/order-history";

export default function PersonalAccount() {
  return (
    <section className={styles.container}>
      <ul className={styles.items}>
        <li className={`${styles.item}`}>
          <NavLink
            to="/profile"
            className={`${styles.link}`}
            activeClassName={styles.active_link}
            exact={true}
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${styles.item}`}>
          <NavLink
            to="/profile/orders"
            className={styles.link}
            activeClassName={styles.active_link}
          >
            История заказов
          </NavLink>
        </li>
        <li className={`${styles.item}`}>
          <NavLink
            to="/logout"
            className={styles.link}
            activeClassName={styles.active_link}
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
        <Route path="/profile/orders">
          <OrderHistory />
        </Route>
      </Switch>
    </section>
  );
}
