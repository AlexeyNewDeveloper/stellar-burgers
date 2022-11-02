import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-category.module.css";
import ItemCard from "../item-card/item-card";

export default class IngredientsCategory extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2 className={`${styles.subtitle} text text_type_main-medium`}>
          {this.props.category}
        </h2>
        <ul className={`${styles.items} pt-6 pr-4 pl-4 pb-10`}>
          {this.props.arrayOfIngredients.map((item, index) => {
            return (
              <li className={styles.item} key={item["_id"]}>
                <ItemCard
                  item={item}
                  detailDataForPopup={this.props.arrayOfDetailDataForPopup.find(
                    (itemDetail) => itemDetail["_id"] === item["_id"]
                  )}
                />
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

IngredientsCategory.propTypes = {
  category: PropTypes.string.isRequired,
  arrayOfIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  arrayOfDetailDataForPopup: PropTypes.arrayOf(PropTypes.object).isRequired,
};
