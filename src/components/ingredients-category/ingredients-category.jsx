import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-category.module.css";
import ItemCard from "../item-card/item-card";
import IngredientDetails from "../ingredients-detail/ingredients-detail";
import withModal from "../hocs/withModal";
import { propTypesForItemObj } from "../../prop-types";
import { enableObserver } from "../../utils/utils";
import { Link, useLocation } from "react-router-dom";

const WithModalItemCard = withModal({
  WrappedComponent: ItemCard,
  DetailInfoComponent: IngredientDetails,
});

export default function IngredientsCategory({
  category,
  arrayOfIngredients,
  categoryKey,
  setActiveTab,
}) {
  let location = useLocation();

  React.useEffect(() => {
    const [observer, target] = enableObserver({
      targetId: categoryKey,
      rootId: "ingredientsArea",
      optionalFunction: setActiveTab,
    });
    return () => {
      observer.unobserve(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <h2
        className={`${styles.subtitle} text text_type_main-medium`}
        id={`${categoryKey}`}
      >
        {category}
      </h2>

      <ul className={`${styles.items} pt-6 pr-4 pl-4 pb-10`}>
        {arrayOfIngredients.map((item) => {
          return (
            <li className={styles.item} key={item["_id"]}>
              <Link
                to={`/ingredients/${item["_id"]}`}
                state={{ backgroundLocation: location }}
                className={styles.link_to_detail_ingredient}
              >
                <ItemCard item={item} />
                {/* <WithModalItemCard item={item} detailInfo={item} /> */}
              </Link>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

IngredientsCategory.propTypes = {
  category: PropTypes.string.isRequired,
  categoryKey: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  arrayOfIngredients: PropTypes.arrayOf(propTypesForItemObj).isRequired,
};
