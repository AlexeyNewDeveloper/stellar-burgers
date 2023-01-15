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
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={styles.page}>
      <BrowserRouter>
        {/* <Route path="/"> */}
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <Content />
          </Route>
          <Route path="/profile">
            <PersonalAccount />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {/* </Route> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
