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
      };
    }
    case CLOSE_POPUP: {
      return {
        ...state,
        currentDetailInfoIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
