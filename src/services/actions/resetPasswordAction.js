import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED = "RESET_PASSWORD_REQUEST_FAILED";
export const RESET_PASSWORD_INITIAL_STATE = "RESET_PASSWORD_INITIAL_STATE";

export function resetPasswordAction(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    fetch(`${URL_FOR_GET_DATA}/password-reset/reset`, {
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
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: RESET_PASSWORD_REQUEST_SUCCESS,
          });
        } else {
          dispatch({ type: RESET_PASSWORD_REQUEST_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: RESET_PASSWORD_REQUEST_FAILED });
      });
  };
}
