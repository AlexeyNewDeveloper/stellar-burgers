import React from "react";
import PropTypes from "prop-types";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default function Content(props) {
  const [state, setState] = React.useState({
    mainData: { bun: [], sauce: [], main: [] },
    detailDataForPopup: { bun: [], sauce: [], main: [] },
  });

  React.useEffect(() => {
    getDataForComponents();
  }, []);

  function getData(data, fields = []) {
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

  const getDataForComponents = () => {
    const arrayMainData = getData(props.data, [
      "_id",
      "name",
      "type",
      "price",
      "image",
    ]);
    const arrayDetailData = getData(props.data, [
      "_id",
      "name",
      "type",
      "image_large",
      "calories",
      "proteins",
      "fat",
      "carbohydrates",
    ]);

    setState({
      detailDataForPopup: arrayDetailData,
      mainData: arrayMainData,
    });
  };

  return (
    <main className={styles.main}>
      <BurgerIngredients
        mainData={state.mainData}
        detailDataForPopup={state.detailDataForPopup}
      />
      <BurgerConstructor mainData={state.mainData} />
    </main>
  );
}

Content.propTypes = {
  data: PropTypes.arrayOf(
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
