import React from "react";
import AppHeader from "../app-header/app-header";
import Content from "../content/content";
import styles from "./app.module.css";
import { data } from "../../utils/data.js";

function App() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <Content data={data} />
    </div>
  );
}

export default App;
