import { combineReducers } from "redux";
import {
  getIngredientsReducer,
  openPopupReducer,
  closePopupReducer,
  makeOrderReducer,
  burgerConstructorTargetReducer,
} from "./reducers";

export const rootReducer = combineReducers({
  getIngredientsReducer,
  openPopupReducer,
  closePopupReducer,
  makeOrderReducer,
  burgerConstructorTargetReducer,
});
