import { URL_FOR_GET_DATA } from "../../utils/constants";
import { GET_USER } from "./userAction";
import { requestTo } from "../../utils/utils";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export function loginAction(value) {
  return function (dispatch) {
    dispatch({
      type: LOGIN,
    });
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
        if (res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
          });
          dispatch({
            type: GET_USER,
            user: res,
          });
          sessionStorage.setItem("user", JSON.stringify(res));
        } else {
          dispatch({ type: LOGIN_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED });
      });
  };
}
