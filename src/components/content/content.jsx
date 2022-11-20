import PropTypes from "prop-types";
import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { propTypesForItemObj } from "../../prop-types";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import { getDataForConstructor } from "../../utils/utils";

export default function Content({ data }) {
  const [ingredientsForBurgerConstructor, totalPrice] = getDataForConstructor({
    data: data,
    restrictedTypes: { bun: 1 },
    deleteItem: true,
  });
  const burgerConstructorData = {
    ingredients: ingredientsForBurgerConstructor,
    totalPrice: totalPrice,
  };

  return (
    <main className={styles.main}>
      <BurgerIngredients ingredients={data} />
      <BurgerConstructorContext.Provider value={burgerConstructorData}>
        <BurgerConstructor />
      </BurgerConstructorContext.Provider>
    </main>
  );
}

Content.propTypes = {
  data: PropTypes.arrayOf(propTypesForItemObj).isRequired,
};
