import React from "react";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import { CATEGORIES } from "../../utils/constants";
import { filterIngredients } from "../../utils/utils";
import { useSelector } from "../../hooks/hooks";
import { TYPE_BUN, TYPE_SAUCE, TYPE_MAIN } from "../../utils/constants";
import { getIngredientsState } from "../../services/selectors/getIngredientsStateSelector";

export type TActiveTabs =
  | typeof TYPE_BUN
  | typeof TYPE_SAUCE
  | typeof TYPE_MAIN;

const BurgerIngredients: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TActiveTabs>(TYPE_BUN);
  const { ingredients } = useSelector(getIngredientsState);
  // const { ingredients, ingredientsRequest, ingredientsFailed } =
  //   useSelector(getIngredientsState);

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
};

export default BurgerIngredients;
