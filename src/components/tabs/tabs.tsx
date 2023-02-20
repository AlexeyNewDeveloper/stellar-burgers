import React from "react";
import styles from "./tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TYPE_BUN, TYPE_SAUCE, TYPE_MAIN } from "../../utils/constants";
import { TActiveTabs } from "../burger-ingredients/burger-ingredients";

interface ITabs {
  activeTab: TActiveTabs;
}

const Tabs: React.FC<ITabs> = ({ activeTab }) => {
  const [current, setCurrent] = React.useState<TActiveTabs>(TYPE_BUN);

  React.useEffect(() => {
    setCurrent(activeTab);
  }, [activeTab]);

  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab
        value={TYPE_BUN}
        active={current === TYPE_BUN}
        onClick={() => setCurrent(TYPE_BUN)}
      >
        Булки
      </Tab>
      <Tab
        value={TYPE_SAUCE}
        active={current === TYPE_SAUCE}
        onClick={() => setCurrent(TYPE_SAUCE)}
      >
        Соусы
      </Tab>
      <Tab
        value={TYPE_MAIN}
        active={current === TYPE_MAIN}
        onClick={() => setCurrent(TYPE_MAIN)}
      >
        Начинки
      </Tab>
    </div>
  );
};

export default Tabs;
