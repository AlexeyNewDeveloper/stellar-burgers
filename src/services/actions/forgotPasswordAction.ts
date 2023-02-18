import { URL_FOR_GET_DATA } from "../../utils/constants";
import { requestTo } from "../../utils/utils";
import { AppThunk, AppDispatch } from "../types";
import { TSimpleAction } from "./typesActions";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_REQUEST_SUCCESS: "FORGOT_PASSWORD_REQUEST_SUCCESS" =
  "FORGOT_PASSWORD_REQUEST_SUCCESS";
export const FORGOT_PASSWORD_REQUEST_FAILED: "FORGOT_PASSWORD_REQUEST_FAILED" =
  "FORGOT_PASSWORD_REQUEST_FAILED";
export const FORGOT_PASSWORD_INITIAL_STATE: "FORGOT_PASSWORD_INITIAL_STATE" =
  "FORGOT_PASSWORD_INITIAL_STATE";

type TGetForgotPasswordRequest = TSimpleAction<typeof FORGOT_PASSWORD_REQUEST>;
type TGetForgotPasswordRequestSuccess = TSimpleAction<
  typeof FORGOT_PASSWORD_REQUEST_SUCCESS
>;
type TGetForgotPasswordRequestFailed = TSimpleAction<
  typeof FORGOT_PASSWORD_REQUEST_FAILED
>;
type TGetForgotInitialState = TSimpleAction<
  typeof FORGOT_PASSWORD_INITIAL_STATE
>;

export const getForgotPasswordRequest = (): TGetForgotPasswordRequest => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
  };
};

export const getForgotPasswordRequestSuccess =
  (): TGetForgotPasswordRequestSuccess => {
    return {
      type: FORGOT_PASSWORD_REQUEST_SUCCESS,
    };
  };

export const getForgotPasswordRequestFailed =
  (): TGetForgotPasswordRequestFailed => {
    return {
      type: FORGOT_PASSWORD_REQUEST_FAILED,
    };
  };

export const getForgotInitialState = (): TGetForgotInitialState => {
  return {
    type: FORGOT_PASSWORD_INITIAL_STATE,
  };
};

export type TForgotPasswordActions =
  | TGetForgotPasswordRequest
  | TGetForgotPasswordRequestSuccess
  | TGetForgotPasswordRequestFailed
  | TGetForgotInitialState;

export const forgotPasswordAction: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(getForgotPasswordRequest());
    requestTo(`${URL_FOR_GET_DATA}/password-reset`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => {
        dispatch(getForgotPasswordRequestSuccess());
      })
      .catch((err) => {
        dispatch(getForgotPasswordRequestFailed());
      });
  };
};
