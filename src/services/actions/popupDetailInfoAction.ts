import { TSimpleAction } from "./typesActions";
import { IIngredient } from "../../types";

export const OPEN_POPUP: "OPEN_POPUP" = "OPEN_POPUP";
export const CLOSE_POPUP: "CLOSE_POPUP" = "CLOSE_POPUP";

type TGetOpenPopupAction = TSimpleAction<typeof OPEN_POPUP> & {
  modalData: IIngredient;
};
type TGetClosePopupAction = TSimpleAction<typeof CLOSE_POPUP>;

export type TPopupDetailInfoActions =
  | TGetOpenPopupAction
  | TGetClosePopupAction;

export const getOpenPopupAction = (
  modalData: IIngredient
): TGetOpenPopupAction => {
  return {
    type: OPEN_POPUP,
    modalData,
  };
};

export const getClosePopupAction = (): TGetClosePopupAction => {
  return {
    type: CLOSE_POPUP,
  };
};
