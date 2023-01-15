import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { GET_USER } from "./userAction";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export function loginAction(value) {
  return function (dispatch) {
    dispatch({
      type: LOGIN,
    });
    fetch(`${URL_FOR_GET_DATA}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
          });
          dispatch({
            type: GET_USER,
            user: res,
          });
        } else {
          dispatch({ type: LOGIN_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED });
      });
  };
}
