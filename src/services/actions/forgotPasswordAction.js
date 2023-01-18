import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_REQUEST_SUCCESS =
  "FORGOT_PASSWORD_REQUEST_SUCCESS";
export const FORGOT_PASSWORD_REQUEST_FAILED = "FORGOT_PASSWORD_REQUEST_FAILED";
export const FORGOT_PASSWORD_INITIAL_STATE = "FORGOT_PASSWORD_INITIAL_STATE";

export function forgotPasswordAction(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    fetch(`${URL_FOR_GET_DATA}/password-reset`, {
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
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: FORGOT_PASSWORD_REQUEST_SUCCESS,
          });
        } else {
          dispatch({ type: FORGOT_PASSWORD_REQUEST_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: FORGOT_PASSWORD_REQUEST_FAILED });
      });
  };
}
