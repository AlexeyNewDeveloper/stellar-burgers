import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { store } from "../..";
import { TGetIngredientsActions } from "../actions/getIngredientsAction";
import { TForgotPasswordActions } from "../actions/forgotPasswordAction";
import { TLoginActions } from "../actions/loginAction";
import { TMakeOrderActions } from "../actions/makeOrderAction";
import { TRegisterActions } from "../actions/registerAction";
import { TResetPasswordActions } from "../actions/resetPasswordAction";
import { TUserActions } from "../actions/userAction";
import { TPopupDetailInfoActions } from "../actions/popupDetailInfoAction";
import { rootReducer } from "../reducers/rootReducer";
import { TwsEventActions } from "../actions/wsAction";
import { TwsUserEventActions } from "../actions/wsUserAction";
import { TBurgerConstructorTargetActions } from "../actions/burgerConstructorTargetAction";

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
  | TGetIngredientsActions
  | TForgotPasswordActions
  | TLoginActions
  | TMakeOrderActions
  | TRegisterActions
  | TResetPasswordActions
  | TUserActions
  | TPopupDetailInfoActions
  | TwsEventActions
  | TwsUserEventActions
  | TBurgerConstructorTargetActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, Action, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
