import styles from "./personal-account.module.css";
import {
  PasswordInput,
  Input,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Profile from "../profile/profile";
import OrderHistory from "../order-history/order-history";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../services/actions/userAction";
import HelpingText from "../../components/helping-text/helping-text";

export default function PersonalAccount() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, userRequest, userRequestFailed } = useSelector(
    (state) => state.userReducer
  );
  const logout = () => {
    dispatch(logoutAction(user.refreshToken));
  };

  return !user ? (
    <Redirect to="/login" />
  ) : (
    <section className={styles.container}>
      <div className={styles.wrapper_item}>
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
            <span
              className={`${styles.link} ${styles.button_logout}`}
              onClick={logout}
            >
              Выход
            </span>
          </li>
        </ul>
        <HelpingText route={location.pathname} />
      </div>
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
