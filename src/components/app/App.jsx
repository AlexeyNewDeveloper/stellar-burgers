import React from "react";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <Content />
    </div>
  );
}

export default App;
