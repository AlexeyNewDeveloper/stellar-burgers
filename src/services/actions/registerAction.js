import { URL_FOR_GET_DATA } from "../../utils/constants";
import { getUser } from "./userAction";
import { requestTo } from "../../utils/utils";
// import { setCookie, getCookie } from "../../utils/utils";

export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const getRegistration = () => {
  return {
    type: REGISTRATION,
  };
};
export const getRegistrationSuccess = () => {
  return {
    type: REGISTRATION_SUCCESS,
  };
};
export const getRegistrationFailed = () => {
  return {
    type: REGISTRATION_FAILED,
  };
};

export function registerAction(value) {
  return function (dispatch) {
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
}
