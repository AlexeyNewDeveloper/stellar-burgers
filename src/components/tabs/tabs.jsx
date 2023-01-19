import React from "react";
import styles from "./tabs.module.css";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TYPE_BUN, TYPE_SAUCE, TYPE_MAIN } from "../../utils/constants";

export default function Tabs({ activeTab }) {
  const [current, setCurrent] = React.useState(TYPE_BUN);

  React.useEffect(() => {
    setCurrent(activeTab);
  }, [activeTab]);

  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab value={TYPE_BUN} active={current === TYPE_BUN} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab
        value={TYPE_SAUCE}
        active={current === TYPE_SAUCE}
        onClick={setCurrent}
      >
        Соусы
      </Tab>
      <Tab
        value={TYPE_MAIN}
        active={current === TYPE_MAIN}
        onClick={setCurrent}
      >
        Начинки
      </Tab>
    </div>
  );
}

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
};
