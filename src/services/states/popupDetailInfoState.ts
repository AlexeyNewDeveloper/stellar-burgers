import { IIngredient } from "../../types";

export interface IPopupDetailInfoInitialState {
  currentDetailInfoIngredient: null | IIngredient;
  openPopup: boolean;
}

export const popupDetailInfoInitialState: IPopupDetailInfoInitialState = {
  currentDetailInfoIngredient: null,
  openPopup: false,
};
