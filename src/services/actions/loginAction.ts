import { URL_FOR_GET_DATA } from "../../utils/constants";
import { getUser } from "./userAction";
import { requestTo } from "../../utils/utils";
import { TSimpleAction } from "./typesActions";
import { AppDispatch, AppThunk } from "../types";
import { IUserData } from "../../types";

export const LOGIN: "LOGIN" = "LOGIN";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

type TGetLogin = TSimpleAction<typeof LOGIN>;
type TGetLoginSuccess = TSimpleAction<typeof LOGIN_SUCCESS>;
type TGetLoginFailed = TSimpleAction<typeof LOGIN_FAILED>;
type TLoginData = Omit<IUserData, "name">;
export type TLoginActions = TGetLogin | TGetLoginSuccess | TGetLoginFailed;

export const getLogin = (): TGetLogin => {
  return {
    type: LOGIN,
  };
};

export const getLoginSuccess = (): TGetLoginSuccess => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const getLoginFailed = (): TGetLoginFailed => {
  return {
    type: LOGIN_FAILED,
  };
};

export const loginAction: AppThunk = (value: TLoginData) => {
  return function (dispatch: AppDispatch) {
    dispatch(getLogin());
    requestTo(`${URL_FOR_GET_DATA}/auth/login`, {
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
        email: value.email,
        password: value.password,
      }),
    })
      .then((res) => {
        dispatch(getLoginSuccess());
        dispatch(getUser(res));
        localStorage.setItem("user", JSON.stringify(res));
      })
      .catch((err) => {
        dispatch(getLoginFailed());
      });
  };
};
