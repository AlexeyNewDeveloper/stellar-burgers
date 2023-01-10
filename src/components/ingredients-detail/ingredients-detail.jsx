import styles from "./ingredients-detail.module.css";
import { SPECIFICATIONS } from "../../utils/constants";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const { currentDetailInfoIngredient } = useSelector(
    (state) => state.popupDetailInfoReducer
  );

  const detailInfo = currentDetailInfoIngredient
    ? currentDetailInfoIngredient
    : {
        name: "Ошибка",
        image_large: "/",
      };

  return (
    <>
      <p className={`${styles.title} text text_type_main-large`}>
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
