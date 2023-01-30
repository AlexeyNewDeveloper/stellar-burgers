import styles from "./ingredients-detail.module.css";
import PropTypes from "prop-types";
import React from "react";
import { SPECIFICATIONS } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngredientsAction } from "../../services/actions/getIngredientsAction";
import { getPopupDetailInfoState } from "../../services/selectors/popupDetailInfoStateSelector";
import { getIngredientsState } from "../../services/selectors/getIngredientsStateSelector";

export default function IngredientDetails({ noModal }) {
  const { currentDetailInfoIngredient } = useSelector(getPopupDetailInfoState);
  const { ingredients, ingredientsRequest } = useSelector(getIngredientsState);
  const { id } = useParams();
  const dispatch = useDispatch();

  let detailInfo = null;

  React.useEffect(() => {
    dispatch(getIngredientsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (noModal && id) {
    detailInfo = ingredients.find((item) => item._id === id);
  } else {
    detailInfo = currentDetailInfoIngredient
      ? currentDetailInfoIngredient
      : {
          name: "Ошибка",
          image_large: "/",
        };
  }

  return ingredientsRequest
    ? "Загрузка..."
    : detailInfo && (
        <>
          <p
            className={`${styles.title} text text_type_main-large ${
              noModal && styles.title_noModal
            }`}
          >
            Детали ингредиента
          </p>
          <img
            src={detailInfo.image_large}
            alt={detailInfo.name}
            className={`${styles.image} mb-4`}
          />
          <p className="text text_type_main-medium mb-8">{detailInfo.name}</p>
          <ul className={`${styles.specifications}`}>
            {detailInfo &&
              Object.keys(SPECIFICATIONS).map((item, index) => {
                return (
                  <li key={index} className={`${styles.parameter}`}>
                    <p className="text text_type_main-default text_color_inactive">
                      {SPECIFICATIONS[item]}
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                      {detailInfo[item]}
                    </p>
                  </li>
                );
              })}
          </ul>
        </>
      );
}

IngredientDetails.propTypes = {
  noModal: PropTypes.bool,
};
