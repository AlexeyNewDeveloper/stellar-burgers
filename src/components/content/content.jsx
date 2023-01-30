import styles from "./content.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation } from "react-router-dom";
import IngredientDetails from "../ingredients-detail/ingredients-detail";
import ModalComponent from "../modal-component/modal-component";

export default function Content() {
  // const { openPopup } = useSelector(getPopupDetailInfoState);
  let location = useLocation();

  return (
    <>
      <Routes location={location.state?.backgroundLocation || location}>
        <Route
          path="/ingredients/:id"
          element={<IngredientDetails noModal={true} />}
        />

        <Route
          index={true}
          path="/*"
          element={
            <main className={styles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          }
        />
      </Routes>
      <Routes>
        {location.state?.backgroundLocation && (
          <Route
            path="ingredients/:id"
            element={
              <ModalComponent>
                <IngredientDetails noModal={false} />
              </ModalComponent>
            }
          />
        )}
      </Routes>
    </>
  );
}
