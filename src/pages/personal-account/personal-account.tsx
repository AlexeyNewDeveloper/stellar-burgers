import styles from "./personal-account.module.css";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Profile from "../profile/profile";
import OrderHistory from "../order-history/order-history";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { logoutAction } from "../../services/actions/userAction";
import HelpingText from "../../components/helping-text/helping-text";
import { getUserState } from "../../services/selectors/userStateSelectors";
import { ProtectedRoute } from "../../components/protected-route/protected-route";

const PersonalAccount: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(getUserState);
  const logout = (e: React.SyntheticEvent): void => {
    if (user) {
      dispatch(logoutAction(user.refreshToken));
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper_item}>
        <ul className={styles.items}>
          <li className={`${styles.item}`}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.active_link}`
              }
              end
            >
              Профиль
            </NavLink>
          </li>
          <li className={`${styles.item}`}>
            <NavLink
              to="/profile/orders"
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.active_link}`
              }
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
      <Routes>
        <Route path="/" element={<Profile />} />

        <Route
          path="/orders/*"
          element={
            <>
              <Routes location={location.state?.backgroundLocation || location}>
                <Route
                  index
                  element={
                    <ProtectedRoute
                      authorized={false}
                      protectedElement={<OrderHistory />}
                    />
                  }
                />
              </Routes>
            </>
          }
        />
      </Routes>
    </section>
  );
};

export default PersonalAccount;
