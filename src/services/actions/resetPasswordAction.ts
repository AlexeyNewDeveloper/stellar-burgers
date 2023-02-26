import { URL_FOR_GET_DATA } from "../../utils/constants";
import { requestTo } from "../../utils/utils";
import { TSimpleAction } from "./typesActions";
import { AppDispatch, AppThunk } from "../types";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_REQUEST_SUCCESS: "RESET_PASSWORD_REQUEST_SUCCESS" =
  "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED: "RESET_PASSWORD_REQUEST_FAILED" =
  "RESET_PASSWORD_REQUEST_FAILED";
export const RESET_PASSWORD_INITIAL_STATE: "RESET_PASSWORD_INITIAL_STATE" =
  "RESET_PASSWORD_INITIAL_STATE";

type TGetResetPasswordRequest = TSimpleAction<typeof RESET_PASSWORD_REQUEST>;
type TGetResetPasswordRequestSuccess = TSimpleAction<
  typeof RESET_PASSWORD_REQUEST_SUCCESS
>;
type TGetResetPasswordRequestFailed = TSimpleAction<
  typeof RESET_PASSWORD_REQUEST_FAILED
>;
type TGetResetPasswordInitialState = TSimpleAction<
  typeof RESET_PASSWORD_INITIAL_STATE
>;
export type TResetPasswordActions =
  | TGetResetPasswordRequest
  | TGetResetPasswordRequestSuccess
  | TGetResetPasswordRequestFailed
  | TGetResetPasswordInitialState;

export const getResetPasswordRequest = (): TGetResetPasswordRequest => {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
};
export const getResetPasswordRequestSuccess =
  (): TGetResetPasswordRequestSuccess => {
    return {
      type: RESET_PASSWORD_REQUEST_SUCCESS,
    };
  };
export const getResetPasswordRequestFailed =
  (): TGetResetPasswordRequestFailed => {
    return {
      type: RESET_PASSWORD_REQUEST_FAILED,
    };
  };
export const getResetPasswordInitialState =
  (): TGetResetPasswordInitialState => {
    return {
      type: RESET_PASSWORD_INITIAL_STATE,
    };
  };

export const resetPasswordAction: AppThunk = (
  password: string,
  token: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch(getResetPasswordRequest());
    requestTo(`${URL_FOR_GET_DATA}/password-reset/reset`, {
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
        password: password,
        token: token,
      }),
    })
      .then((res) => {
        dispatch(getResetPasswordRequestSuccess());
      })
      .catch((err) => {
        dispatch(getResetPasswordRequestFailed());
      });
  };
};
