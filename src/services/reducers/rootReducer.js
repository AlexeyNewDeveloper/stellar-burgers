import { combineReducers } from "redux";
import {
  getIngredientsReducer,
  openPopupReducer,
  closePopupReducer,
  makeOrderReducer,
} from "./reducers";

export const rootReducer = combineReducers({
  getIngredientsReducer,
  openPopupReducer,
  closePopupReducer,
  makeOrderReducer,
});
