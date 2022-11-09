import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-detail.module.css";
import { specifications } from "../../utils/constants";

export default function IngredientDetails(props) {
  return (
    <>
      <p className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <img
        src={props.detailInfo.image_large}
        alt={props.detailInfo.name}
        className={`${styles.image} mb-4`}
      />
      <p className="text text_type_main-medium mb-8">{props.detailInfo.name}</p>
      <ul className={`${styles.specifications}`}>
        {Object.keys(specifications).map((item, index) => {
          return (
            <li key={index} className={`${styles.parameter}`}>
              <p className="text text_type_main-default text_color_inactive">
                {specifications[item]}
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {props.detailInfo[item]}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  detailInfo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
  }).isRequired,
};