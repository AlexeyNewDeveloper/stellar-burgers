import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-category.module.css";
import ItemCard from "../item-card/item-card";
import IngredientDetails from "../ingredients-detail/ingredients-detail";
import withModal from "../hocs/withModal";

const WithModalItemCard = withModal({
  WrappedComponent: ItemCard,
  DetailInfoComponent: IngredientDetails,
});

export default function IngredientsCategory({
  category,
  arrayOfIngredients,
  ...props
}) {
  return (
    <React.Fragment>
      <h2
        className={`${styles.subtitle} text text_type_main-medium`}
        id={`category-${category}`}
      >
        {category}
      </h2>
      <ul className={`${styles.items} pt-6 pr-4 pl-4 pb-10`}>
        {arrayOfIngredients.map((item, index) => {
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
  arrayOfIngredients: PropTypes.arrayOf(
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
