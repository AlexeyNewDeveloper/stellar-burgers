import { combineReducers } from "redux";
import { getIngredientsReducer } from "./getIngredientsReducer";
import { popupDetailInfoReducer } from "./popupDetailInfoReducer";
import { makeOrderReducer } from "./makeOrderReducer";
import { burgerConstructorTargetReducer } from "./burgerConstructorTargetReducer";

export const rootReducer = combineReducers({
  getIngredientsReducer,
  popupDetailInfoReducer,
  makeOrderReducer,
  burgerConstructorTargetReducer,
});
