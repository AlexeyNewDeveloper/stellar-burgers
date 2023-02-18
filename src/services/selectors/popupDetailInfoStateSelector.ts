import { RootState } from "../types";
import { IPopupDetailInfoInitialState } from "../states/popupDetailInfoState";

export const getPopupDetailInfoState = (
  state: RootState
): IPopupDetailInfoInitialState => state.popupDetailInfoReducer;
