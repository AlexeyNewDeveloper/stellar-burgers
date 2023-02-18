import { URL_FOR_GET_DATA } from "../../utils/constants";
import { getUser } from "./userAction";
import { requestTo } from "../../utils/utils";
// import { setCookie, getCookie } from "../../utils/utils";
import { TSimpleAction } from "./typesActions";
import { AppDispatch, AppThunk } from "../types";
import { IUserData } from "../../types";

export const REGISTRATION: "REGISTRATION" = "REGISTRATION";
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" =
  "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED: "REGISTRATION_FAILED" = "REGISTRATION_FAILED";

type TGetRegistration = TSimpleAction<typeof REGISTRATION>;
type TGetRegistrationSuccess = TSimpleAction<typeof REGISTRATION_SUCCESS>;
type TGetRegistrationFailed = TSimpleAction<typeof REGISTRATION_FAILED>;
export type TRegisterActions =
  | TGetRegistration
  | TGetRegistrationSuccess
  | TGetRegistrationFailed;

export const getRegistration = (): TGetRegistration => {
  return {
    type: REGISTRATION,
  };
};
export const getRegistrationSuccess = (): TGetRegistrationSuccess => {
  return {
    type: REGISTRATION_SUCCESS,
  };
};
export const getRegistrationFailed = (): TGetRegistrationFailed => {
  return {
    type: REGISTRATION_FAILED,
  };
};

export const registerAction: AppThunk = (value: IUserData) => {
  return function (dispatch: AppDispatch) {
    dispatch(getRegistration());
    requestTo(`${URL_FOR_GET_DATA}/auth/register`, {
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
        name: value.name,
      }),
    })
      .then((res) => {
        dispatch(getRegistrationSuccess());
        dispatch(getUser(res));
        localStorage.setItem("user", JSON.stringify(res));
      })
      .catch((err) => {
        dispatch(getRegistrationFailed());
      });
  };
};
