import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

export const GET_USER = "GET_USER";
export const USER_REQUEST = "USER_REQUEST";
export const USER_REQUEST_FAILED = "USER_REQUEST_FAILED";
export const LOGOUT_USER = "LOGOUT";

export function logoutAction(token) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    fetch(`${URL_FOR_GET_DATA}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: LOGOUT_USER,
          });
        } else {
          dispatch({ type: USER_REQUEST_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: USER_REQUEST_FAILED });
      });
  };
}
