import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  NotFound404,
  PersonalAccount,
} from "../../pages";
import styles from "./app.module.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";
import FeedOrders from "../feed-orders/feed-orders";
import OrderPage from "../../pages/order-page/order-page";
import ModalComponent from "../modal-component/modal-component";

function App() {
  const location = useLocation();
  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes>
        <Route path="/*" exact={true} element={<Content />} />

        <Route
          path="/profile/*"
          element={
            <ProtectedRoute
              authorized={false}
              protectedElement={<PersonalAccount />}
            />
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute
              authorized={true}
              protectedElement={<ForgotPassword />}
            />
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute
              authorized={true}
              protectedElement={<ResetPassword />}
            />
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute authorized={true} protectedElement={<Register />} />
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRoute authorized={true} protectedElement={<Login />} />
          }
        />

        <Route
          path="/feed/*"
          element={
            <>
              <Routes location={location.state?.backgroundLocation || location}>
                <Route index element={<FeedOrders />} />
                <Route path=":id" element={<OrderPage />} />
              </Routes>
              <Routes>
                {location.state?.backgroundLocation && (
                  <Route
                    path=":id"
                    element={
                      <ModalComponent>
                        <OrderPage modal={true} />
                      </ModalComponent>
                    }
                  />
                )}
              </Routes>
            </>
          }
        />

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
