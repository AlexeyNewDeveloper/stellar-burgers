import React from "react";
import styles from "./ingredients-wrapper.module.css";
import ItemCard from "../item-card/item-card";

export default class IngredientsWrapper extends React.Component {
  render() {
    return (
      <ul className={`${styles.items} pt-6 pr-4 pl-4 pb-10`}>
        {this.props.data.map((item) => {
          return (
            <li className={styles.item} key={item["_id"]}>
              <ItemCard item={item} />
            </li>
          );
        })}
      </ul>
    );
  }
}
