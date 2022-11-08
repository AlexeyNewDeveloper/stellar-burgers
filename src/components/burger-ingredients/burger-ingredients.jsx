import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import { categories } from "../../utils/constants";
import filterIngredients from "../../utils/utils";

export default function BurgerIngredients({ ingredients }) {
  // const buns = ingredients.filter((item) => item.type === "bun");
  // const mains = ingredients.filter((item) => item.type === "main");
  // const sauces = ingredients.filter((item) => item.type === "sauce");

  const filtredIngredients = filterIngredients(ingredients, {
    bun: [],
    sauce: [],
    main: [],
  });

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
              category={categories[key]}
              arrayOfIngredients={filtredIngredients[key]}
            />
          );
        })}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
