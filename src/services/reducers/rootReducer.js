import { combineReducers } from "redux";
import { getIngredientsReducer } from "./getIngredientsReducer";
import { popupDetailInfoReducer } from "./popupDetailInfoReducer";
import { makeOrderReducer } from "./makeOrderReducer";
import { burgerConstructorTargetReducer } from "./burgerConstructorTargetReducer";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  getIngredientsReducer,
  popupDetailInfoReducer,
  makeOrderReducer,
  burgerConstructorTargetReducer,
  registerReducer,
  loginReducer,
  userReducer,
});
