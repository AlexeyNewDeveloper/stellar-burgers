import { CLOSE_POPUP, OPEN_POPUP } from "../actions/popupDetailInfoAction";
import { popupDetailInfoInitialState } from "../states/popupDetailInfoState";

export const popupDetailInfoReducer = (
  state = popupDetailInfoInitialState,
  action
) => {
  switch (action.type) {
    case OPEN_POPUP: {
      return {
        ...state,
        currentDetailInfoIngredient: action.modalData,
        openPopup: true,
      };
    }
    case CLOSE_POPUP: {
      return {
        ...state,
        currentDetailInfoIngredient: null,
        openPopup: false,
      };
    }
    default: {
      return state;
    }
  }
};
