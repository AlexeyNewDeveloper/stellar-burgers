import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import IngredientsCategory from "../ingredients-category/ingredients-category";

export default class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {
        main: "Начинки",
        bun: "Булки",
        sauce: "Соусы",
      },
    };
  }

  render() {
    return (
      <section className={`${styles.section} mr-10 pt-10 `}>
        <h1 className={`${styles.title} text text_type_main-medium mb-5`}>
          Соберите бургер
        </h1>
        <Tabs />
        <div className={`${styles.ingredients}`}>
          {Object.keys(this.props.mainData).map((key, index) => {
            return (
              <React.Fragment key={index}>
                <IngredientsCategory
                  category={this.state.categories[key]}
                  arrayOfIngredients={this.props.mainData[key]}
                  arrayOfDetailDataForPopup={this.props.detailDataForPopup[key]}
                />
              </React.Fragment>
            );
          })}
        </div>
      </section>
    );
  }
}

BurgerIngredients.propTypes = {
  mainData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  detailDataForPopup: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object))
    .isRequired,
};
