import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { GET_USER } from "./userAction";

export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export function registerAction(value) {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION,
    });
    fetch(`${URL_FOR_GET_DATA}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
        name: value.name,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: REGISTRATION_SUCCESS,
          });
          dispatch({
            type: GET_USER,
            user: res,
          });
        } else {
          dispatch({ type: REGISTRATION_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: REGISTRATION_FAILED });
      });
  };
}
