import React from "react";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import { CATEGORIES } from "../../utils/constants";
import { filterIngredients } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsAction } from "../../services/actions/actions";

export default function BurgerIngredients() {
  const [activeTab, setActiveTab] = React.useState("bun");
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.getIngredientsReducer
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredientsAction());
  }, []);

  const filtredIngredients = React.useMemo(() => {
    return filterIngredients(ingredients, {
      bun: [],
      sauce: [],
      main: [],
    });
  }, [ingredients]);

  return (
    <section className={`${styles.section} mr-10 pt-10 `}>
      <h1 className={`${styles.title} text text_type_main-medium mb-5`}>
        Соберите бургер
      </h1>
      <Tabs activeTab={activeTab} />
      <div id="ingredientsArea" className={`${styles.ingredients}`}>
        {ingredientsRequest && "Загрузка..."}
        {ingredientsFailed && "Произошла ошибка"}
        {ingredients.length &&
          Object.keys(filtredIngredients).map((key, index) => {
            return (
              <IngredientsCategory
                key={index}
                categoryKey={key}
                category={CATEGORIES[key]}
                setActiveTab={setActiveTab}
                arrayOfIngredients={filtredIngredients[key]}
              />
            );
          })}
      </div>
    </section>
  );
}
