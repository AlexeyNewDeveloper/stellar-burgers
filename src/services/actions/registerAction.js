import { URL_FOR_GET_DATA } from "../../utils/constants";
import { GET_USER } from "./userAction";
import { requestTo } from "../../utils/utils";
// import { setCookie, getCookie } from "../../utils/utils";

export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export function registerAction(value) {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION,
    });
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
        if (res.success) {
          dispatch({
            type: REGISTRATION_SUCCESS,
          });
          dispatch({
            type: GET_USER,
            user: res,
          });
          sessionStorage.setItem("user", JSON.stringify(res));
        } else {
          dispatch({ type: REGISTRATION_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: REGISTRATION_FAILED });
      });
  };
}
