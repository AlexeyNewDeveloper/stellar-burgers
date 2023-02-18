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

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TGetIngredientsActions
  | TForgotPasswordActions
  | TLoginActions
  | TMakeOrderActions
  | TRegisterActions
  | TResetPasswordActions
  | TUserActions
  | TPopupDetailInfoActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, Action, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
