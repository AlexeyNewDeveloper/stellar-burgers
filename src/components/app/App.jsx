import React from "react";
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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";
import IngredientDetails from "../ingredients-detail/ingredients-detail";
import { useSelector } from "react-redux";

function App() {
  const { openPopup } = useSelector((state) => state.popupDetailInfoReducer);

  return (
    <div className={styles.page}>
      <BrowserRouter>
        {/* <Route path="/"> */}
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
              <ProtectedRoute
                authorized={true}
                protectedElement={<Register />}
              />
            }
          />

          <Route
            path="/login"
            element={
              <ProtectedRoute authorized={true} protectedElement={<Login />} />
            }
          />

          {!openPopup && (
            <Route
              path="/ingredients/:id"
              element={<IngredientDetails noModal={true} />}
            />
          )}

          <Route path="*" element={<NotFound404 />} />
        </Routes>
        {/* </Route> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
