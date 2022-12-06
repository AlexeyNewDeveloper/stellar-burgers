import React from "react";
import styles from "./tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs({ activeTab }) {
  const [current, setCurrent] = React.useState("bun");

  React.useEffect(() => {
    setCurrent(activeTab);
  }, [activeTab]);

  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}
