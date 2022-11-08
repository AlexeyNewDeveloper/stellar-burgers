import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import { categories } from "../../utils/constants";

export default function BurgerIngredients(props) {
  return (
    <section className={`${styles.section} mr-10 pt-10 `}>
      <h1 className={`${styles.title} text text_type_main-medium mb-5`}>
        Соберите бургер
      </h1>
      <Tabs />
      <div className={`${styles.ingredients}`}>
        {Object.keys(props.mainData).map((key, index) => {
          return (
            <IngredientsCategory
              key={index}
              category={categories[key]}
              arrayOfIngredients={props.mainData[key]}
              arrayOfDetailDataForPopup={props.detailDataForPopup[key]}
            />
          );
        })}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  mainData: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
  detailDataForPopup: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        image_large: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
};
