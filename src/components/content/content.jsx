import React from "react";
import PropTypes from "prop-types";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: { bun: [], sauce: [], main: [] },
      detailDataForPopup: { bun: [], sauce: [], main: [] },
    };
  }

  _getData(data, fields = []) {
    return data.reduce(
      (acc, current, index, arr) => {
        const itemObj = fields.reduce((accum, curr) => {
          return { ...accum, [curr]: current[curr] };
        }, {});

        acc[current.type].push(itemObj);
        return acc;
      },
      { bun: [], sauce: [], main: [] }
    );
  }

  getDataForComponents = () => {
    const arrayMainData = this._getData(this.props.data, [
      "_id",
      "name",
      "type",
      "price",
      "image",
    ]);
    const arrayDetailData = this._getData(this.props.data, [
      "_id",
      "name",
      "type",
      "image_large",
      "calories",
      "proteins",
      "fat",
      "carbohydrates",
    ]);

    this.setState({
      detailDataForPopup: arrayDetailData,
      mainData: arrayMainData,
    });
  };
  componentDidMount() {
    this.getDataForComponents();
  }

  render() {
    return (
      <main className={styles.main}>
        <BurgerIngredients
          mainData={this.state.mainData}
          detailDataForPopup={this.state.detailDataForPopup}
        />
        <BurgerConstructor mainData={this.state.mainData} />
      </main>
    );
  }
}

Content.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
