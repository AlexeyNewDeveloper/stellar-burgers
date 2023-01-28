import { URL_FOR_GET_DATA } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { wsUserConnectionClosed } from "./wsUserAction";
// import { getCookie, setCookie } from "../../utils/utils";

export const GET_USER = "GET_USER";
export const USER_REQUEST = "USER_REQUEST";
export const USER_REQUEST_FAILED = "USER_REQUEST_FAILED";
export const LOGOUT_USER = "LOGOUT";
export const GET_EDITABLE_DATA = "GET_EDITABLE_DATA";
export const USER_EDITABLE_DATA_REQUEST = "USER_EDITABLE_DATA_REQUEST";
export const USER_EDITABLE_DATA_REQUEST_FAILED =
  "USER_EDITABLE_DATA_REQUEST_FAILED";
export const UPDATE_TOKEN_INITIAL_STATE = "UPDATE_TOKEN_INITIAL_STATE";
export const UPDATE_ACCESS_TOKEN = "UPDATE_ACCESS_TOKEN";
export const UPDATE_ACCESS_TOKEN_REQUEST = "UPDATE_ACCESS_TOKEN_REQUEST";
export const UPDATE_ACCESS_TOKEN_REQUEST_FAILED =
  "UPDATE_ACCESS_TOKEN_REQUEST_FAILED";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const UPDATE_USER_DATA_REQUEST = "UPDATE_USER_DATA_REQUEST";
export const UPDATE_USER_DATA_REQUEST_FAILED =
  "UPDATE_USER_DATA_REQUEST_FAILED";

export const getInitialStateForToken = () => {
  return {
    type: UPDATE_TOKEN_INITIAL_STATE,
  };
};

export function logoutAction(token) {
  return function (dispatch, getState) {
    dispatch({
      type: USER_REQUEST,
    });
    fetch(`${URL_FOR_GET_DATA}/auth/logout`, {
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
        token: token,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: LOGOUT_USER,
          });
          sessionStorage.removeItem("user");
          const { wsUserConnectedSuccess, wsUserConnected } =
            getState().wsUserReducer;
          if (wsUserConnectedSuccess || wsUserConnected) {
            dispatch(wsUserConnectionClosed());
          }
          // document.cookie = "";
          // setCookie("refreshToken", null, { expires: -1 });
        } else {
          dispatch({ type: USER_REQUEST_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: USER_REQUEST_FAILED });
      });
  };
}

export function getUserDataAction(accessToken) {
  return function (dispatch) {
    dispatch({
      type: USER_EDITABLE_DATA_REQUEST,
    });
    fetch(`${URL_FOR_GET_DATA}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: accessToken,
      },
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_EDITABLE_DATA,
            editableUser: res,
          });
        } else {
          dispatch({ type: USER_EDITABLE_DATA_REQUEST_FAILED });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: USER_EDITABLE_DATA_REQUEST_FAILED });
      });
  };
}

export function updateAccessTokenAction(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_ACCESS_TOKEN_REQUEST,
    });
    fetch(`${URL_FOR_GET_DATA}/auth/token`, {
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
        token: refreshToken,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: UPDATE_ACCESS_TOKEN,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              ...JSON.parse(sessionStorage.getItem("user")),
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            })
          );
          // setCookie("refreshToken", res.refreshToken);
        } else {
          dispatch({ type: UPDATE_ACCESS_TOKEN_REQUEST_FAILED });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: UPDATE_ACCESS_TOKEN_REQUEST_FAILED });
      });
  };
}

export function updateUserDataAction(updatedUser, accessToken) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_DATA_REQUEST,
    });
    fetch(`${URL_FOR_GET_DATA}/auth/user`, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: accessToken,
      },
      body: JSON.stringify(updatedUser),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: UPDATE_USER_DATA,
            updatedDataUser: res.user,
          });
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              ...JSON.parse(sessionStorage.getItem("user")),
              user: { name: res.user.name, email: res.user.email },
            })
          );
        } else {
          dispatch({ type: UPDATE_USER_DATA_REQUEST_FAILED });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: UPDATE_USER_DATA_REQUEST_FAILED });
      });
  };
}
