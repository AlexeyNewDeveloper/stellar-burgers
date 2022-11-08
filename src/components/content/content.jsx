import React from "react";
import PropTypes from "prop-types";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default function Content({ data }) {
  return (
    <main className={styles.main}>
      <BurgerIngredients ingredients={data} />
      <BurgerConstructor ingredients={data} />
    </main>
  );
}
