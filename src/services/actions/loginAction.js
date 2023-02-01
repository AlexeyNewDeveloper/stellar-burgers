import { URL_FOR_GET_DATA } from "../../utils/constants";
import { getUser } from "./userAction";
import { requestTo } from "../../utils/utils";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const getLogin = () => {
  return {
    type: LOGIN,
  };
};

export const getLoginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const getLoginFailed = () => {
  return {
    type: LOGIN_FAILED,
  };
};

export function loginAction(value) {
  return function (dispatch) {
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
}
