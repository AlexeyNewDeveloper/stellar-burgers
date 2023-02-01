import { URL_FOR_GET_DATA } from "../../utils/constants";
import { requestTo } from "../../utils/utils";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED = "RESET_PASSWORD_REQUEST_FAILED";
export const RESET_PASSWORD_INITIAL_STATE = "RESET_PASSWORD_INITIAL_STATE";

export const getResetPasswordRequest = () => {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
};
export const getResetPasswordRequestSuccess = () => {
  return {
    type: RESET_PASSWORD_REQUEST_SUCCESS,
  };
};
export const getResetPasswordRequestFailed = () => {
  return {
    type: RESET_PASSWORD_REQUEST_FAILED,
  };
};
export const getResetPasswordInitialState = () => {
  return {
    type: RESET_PASSWORD_INITIAL_STATE,
  };
};

export function resetPasswordAction(password, token) {
  return function (dispatch) {
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
}
