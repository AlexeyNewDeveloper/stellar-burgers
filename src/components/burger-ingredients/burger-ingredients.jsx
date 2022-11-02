import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import ItemCard from "../item-card/item-card";

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
                <h2 className={`${styles.subtitle} text text_type_main-medium`}>
                  {this.state.categories[key]}
                </h2>
                <ul className={`${styles.items} pt-6 pr-4 pl-4 pb-10`}>
                  {this.props.mainData[key].map((item, index) => {
                    return (
                      <li className={styles.item} key={item["_id"]}>
                        <ItemCard
                          item={item}
                          detailDataForPopup={this.props.detailDataForPopup[
                            key
                          ].find((i) => i["_id"] === item["_id"])}
                        />
                      </li>
                    );
                  })}
                </ul>
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
