import React from "react";
import styles from "./tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs(props) {
  const [current, setCurrent] = React.useState("buns");
  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab
        value="fillings"
        active={current === "fillings"}
        onClick={setCurrent}
      >
        Начинки
      </Tab>
    </div>
  );
}
