import styles from "./content.module.css";
import React from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import IngredientDetails from "../ingredients-detail/ingredients-detail";
import { getPopupDetailInfoState } from "../../services/selectors/popupDetailInfoStateSelector";
import { NotFound404 } from "../../pages";
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
