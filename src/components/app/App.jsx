import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { getIngredientsState } from "../../services/selectors/getIngredientsStateSelector";
import { getIngredientsAction } from "../../services/actions/getIngredientsAction";

export const IngredientsContext = React.createContext(null);

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getIngredientsState);

  React.useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredientsAction());
    }
  }, []);

  return (
    <IngredientsContext.Provider value={ingredients.length && { ingredients }}>
      {ingredients.length && (
        <div className={styles.page}>
          <AppHeader />
          <Routes>
            <Route path="/*" exact={true} element={<Content />} />

            <Route
              path="/profile/*"
              element={
                <ProtectedRoute
                  authorized={false}
                  protectedElement={
                    <>
                      <Routes
                        location={
                          location.state?.backgroundLocation || location
                        }
                      >
                        <Route path="/*" element={<PersonalAccount />} />
                        <Route path="orders/:id" element={<OrderPage />} />
                      </Routes>
                      <Routes>
                        {location.state?.backgroundLocation && (
                          <Route
                            path="orders/:id"
                            element={
                              <ProtectedRoute
                                authorized={false}
                                protectedElement={
                                  <ModalComponent>
                                    <OrderPage modal={true} />
                                  </ModalComponent>
                                }
                              />
                            }
                          />
                        )}
                      </Routes>
                    </>
                  }
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
                <ProtectedRoute
                  authorized={true}
                  protectedElement={<Register />}
                />
              }
            />

            <Route
              path="/login"
              element={
                <ProtectedRoute
                  authorized={true}
                  protectedElement={<Login />}
                />
              }
            />

            <Route
              path="/feed/*"
              element={
                <>
                  <Routes
                    location={location.state?.backgroundLocation || location}
                  >
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
      )}
    </IngredientsContext.Provider>
  );
}

export default App;
