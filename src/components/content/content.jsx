import React from "react";
import PropTypes from "prop-types";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { bun: [], sauce: [], main: [] },
    };
  }

  getDataForContent = () => {
    const arrayData = this.props.data.reduce(
      (acc, current, index, arr) => {
        if (current.type in acc) {
          acc[current.type].push({
            _id: current["_id"],
            name: current.name,
            type: current.type,
            price: current.price,
            image: current.image,
          });
        } else {
          acc[current.type] = [].push({
            _id: current["_id"],
            name: current.name,
            type: current.type,
            price: current.price,
            image: current.image,
          });
        }
        return acc;
      },
      { bun: [], sauce: [], main: [] }
    );
    this.setState({ data: arrayData });
  };

  componentDidMount() {
    this.getDataForContent();
  }

  render() {
    return (
      <main className={styles.main}>
        <BurgerIngredients data={this.state.data} />
        <BurgerConstructor data={this.state.data} />
      </main>
    );
  }
}

Content.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
