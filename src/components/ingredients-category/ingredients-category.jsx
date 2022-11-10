import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-category.module.css";
import ItemCard from "../item-card/item-card";
import IngredientDetails from "../ingredients-detail/ingredients-detail";
import withModal from "../hocs/withModal";
import { propTypesForItemObj } from "../../prop-types";

const WithModalItemCard = withModal({
  WrappedComponent: ItemCard,
  DetailInfoComponent: IngredientDetails,
});

export default function IngredientsCategory({ category, arrayOfIngredients }) {
  return (
    <React.Fragment>
      <h2
        className={`${styles.subtitle} text text_type_main-medium`}
        id={`category-${category}`}
      >
        {category}
      </h2>
      <ul className={`${styles.items} pt-6 pr-4 pl-4 pb-10`}>
        {arrayOfIngredients.map((item) => {
          return (
            <li className={styles.item} key={item["_id"]}>
              <WithModalItemCard item={item} detailInfo={item} />
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

IngredientsCategory.propTypes = {
  category: PropTypes.string.isRequired,
  arrayOfIngredients: PropTypes.arrayOf(propTypesForItemObj).isRequired,
};
