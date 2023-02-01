import { URL_FOR_GET_DATA } from "../../utils/constants";
import { wsUserConnectionClosed } from "./wsUserAction";
import { requestTo } from "../../utils/utils";
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
export const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};
export const getUserRequest = () => {
  return {
    type: USER_REQUEST,
  };
};
export const getUserRequestFailed = () => {
  return {
    type: USER_REQUEST_FAILED,
  };
};
export const getLogoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
export const getEditableData = (editableUser) => {
  return {
    type: GET_EDITABLE_DATA,
    editableUser,
  };
};
export const getUserEditableDataRequest = () => {
  return {
    type: USER_EDITABLE_DATA_REQUEST,
  };
};
export const getUserEditableDataRequestFailed = () => {
  return {
    type: USER_EDITABLE_DATA_REQUEST_FAILED,
  };
};
export const getUpdateAccessToken = (accessToken, refreshToken) => {
  return {
    type: UPDATE_ACCESS_TOKEN,
    accessToken,
    refreshToken,
  };
};
export const getUpdateAccessTokenRequest = () => {
  return {
    type: UPDATE_ACCESS_TOKEN_REQUEST,
  };
};
export const getUpdateAccessTokenRequestFailed = () => {
  return {
    type: UPDATE_ACCESS_TOKEN_REQUEST_FAILED,
  };
};
export const getUpdateUserData = (updatedDataUser) => {
  return {
    type: UPDATE_USER_DATA,
    updatedDataUser,
  };
};
export const getUpdateUserDataRequest = () => {
  return {
    type: UPDATE_USER_DATA_REQUEST,
  };
};
export const getUpdateUserDataRequestFailed = () => {
  return {
    type: UPDATE_USER_DATA_REQUEST_FAILED,
  };
};

export function logoutAction(token) {
  return function (dispatch, getState) {
    dispatch(getUserRequest());
    requestTo(`${URL_FOR_GET_DATA}/auth/logout`, {
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
      .then((res) => {
        dispatch(getLogoutUser());
        localStorage.removeItem("user");
        const { wsUserConnectedSuccess, wsUserConnected } =
          getState().wsUserReducer;
        if (wsUserConnectedSuccess || wsUserConnected) {
          dispatch(wsUserConnectionClosed());
        }
      })
      .catch((err) => {
        dispatch(getUserRequestFailed());
      });
  };
}

export function getUserDataAction(accessToken) {
  return function (dispatch) {
    dispatch(getUserEditableDataRequest());
    requestTo(`${URL_FOR_GET_DATA}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: accessToken,
      },
    })
      .then((res) => {
        dispatch(getEditableData(res));
      })
      .catch((err) => {
        dispatch(getUserEditableDataRequestFailed());
      });
  };
}

export function updateAccessTokenAction(refreshToken) {
  return function (dispatch) {
    dispatch(getUpdateAccessTokenRequest());
    requestTo(`${URL_FOR_GET_DATA}/auth/token`, {
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
      .then((res) => {
        dispatch(getUpdateAccessToken(res.accessToken, res.refreshToken));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user")),
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
        );
      })
      .catch((err) => {
        dispatch(getUpdateAccessTokenRequestFailed());
      });
  };
}

export function updateUserDataAction(updatedUser, accessToken) {
  return function (dispatch) {
    dispatch(getUpdateUserDataRequest());
    requestTo(`${URL_FOR_GET_DATA}/auth/user`, {
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
      .then((res) => {
        dispatch(getUpdateUserData(res.user));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user")),
            user: { name: res.user.name, email: res.user.email },
          })
        );
      })
      .catch((err) => {
        dispatch(getUpdateUserDataRequestFailed());
      });
  };
}
