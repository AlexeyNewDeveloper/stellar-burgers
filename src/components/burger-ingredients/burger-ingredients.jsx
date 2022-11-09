import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import { CATEGORIES } from "../../utils/constants";
import { filterIngredients } from "../../utils/utils";
import { propTypesForItemObj } from "../../prop-types";

export default function BurgerIngredients({ ingredients }) {
  const filtredIngredients = React.useMemo(() => {
    return filterIngredients(ingredients, {
      bun: [],
      sauce: [],
      main: [],
    });
  }, [ingredients]);

  return (
    <section className={`${styles.section} mr-10 pt-10 `}>
      <h1 className={`${styles.title} text text_type_main-medium mb-5`}>
        Соберите бургер
      </h1>
      <Tabs />
      <div className={`${styles.ingredients}`}>
        {Object.keys(filtredIngredients).map((key, index) => {
          return (
            <IngredientsCategory
              key={index}
              category={CATEGORIES[key]}
              arrayOfIngredients={filtredIngredients[key]}
            />
          );
        })}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(propTypesForItemObj).isRequired,
};
