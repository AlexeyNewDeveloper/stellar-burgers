import { URL_FOR_GET_DATA } from "../../utils/constants";
import { wsUserConnectionClosed } from "./wsUserAction";
import { requestTo } from "../../utils/utils";
// import { getCookie, setCookie } from "../../utils/utils";
import { TSimpleAction } from "./typesActions";
import { AppDispatch, AppThunk, AppGetState } from "../types";
import {
  IUser,
  IUserEditableData,
  IUpdatedDataUser,
  IUpdatedFieldsUser,
} from "../../types";

export const GET_USER: "GET_USER" = "GET_USER";
export const USER_REQUEST: "USER_REQUEST" = "USER_REQUEST";
export const USER_REQUEST_FAILED: "USER_REQUEST_FAILED" = "USER_REQUEST_FAILED";
export const LOGOUT_USER: "LOGOUT" = "LOGOUT";
export const GET_EDITABLE_DATA: "GET_EDITABLE_DATA" = "GET_EDITABLE_DATA";
export const USER_EDITABLE_DATA_REQUEST: "USER_EDITABLE_DATA_REQUEST" =
  "USER_EDITABLE_DATA_REQUEST";
export const USER_EDITABLE_DATA_REQUEST_FAILED: "USER_EDITABLE_DATA_REQUEST_FAILED" =
  "USER_EDITABLE_DATA_REQUEST_FAILED";
export const UPDATE_TOKEN_INITIAL_STATE: "UPDATE_TOKEN_INITIAL_STATE" =
  "UPDATE_TOKEN_INITIAL_STATE";
export const UPDATE_ACCESS_TOKEN: "UPDATE_ACCESS_TOKEN" = "UPDATE_ACCESS_TOKEN";
export const UPDATE_ACCESS_TOKEN_REQUEST: "UPDATE_ACCESS_TOKEN_REQUEST" =
  "UPDATE_ACCESS_TOKEN_REQUEST";
export const UPDATE_ACCESS_TOKEN_REQUEST_FAILED: "UPDATE_ACCESS_TOKEN_REQUEST_FAILED" =
  "UPDATE_ACCESS_TOKEN_REQUEST_FAILED";
export const UPDATE_USER_DATA: "UPDATE_USER_DATA" = "UPDATE_USER_DATA";
export const UPDATE_USER_DATA_REQUEST: "UPDATE_USER_DATA_REQUEST" =
  "UPDATE_USER_DATA_REQUEST";
export const UPDATE_USER_DATA_REQUEST_FAILED: "UPDATE_USER_DATA_REQUEST_FAILED" =
  "UPDATE_USER_DATA_REQUEST_FAILED";

type TGetInitialStateForToken = TSimpleAction<
  typeof UPDATE_TOKEN_INITIAL_STATE
>;
type TGetUser = TSimpleAction<typeof GET_USER> & { user: IUser };
type TGetUserRequest = TSimpleAction<typeof USER_REQUEST>;
type TGetUserRequestFailed = TSimpleAction<typeof USER_REQUEST_FAILED>;
type TGetLogoutUser = TSimpleAction<typeof LOGOUT_USER>;
type TGetEditableData = TSimpleAction<typeof GET_EDITABLE_DATA> & {
  editableUser: IUserEditableData;
};
type TGetUserEditableDataRequest = TSimpleAction<
  typeof USER_EDITABLE_DATA_REQUEST
>;
type TGetUserEditableDataRequestFailed = TSimpleAction<
  typeof USER_EDITABLE_DATA_REQUEST_FAILED
>;
type TGetUpdateAccessToken = TSimpleAction<typeof UPDATE_ACCESS_TOKEN> & {
  accessToken: string;
  refreshToken: string;
};
type TGetUpdateAccessTokenRequest = TSimpleAction<
  typeof UPDATE_ACCESS_TOKEN_REQUEST
>;
type TGetUpdateAccessTokenRequestFailed = TSimpleAction<
  typeof UPDATE_ACCESS_TOKEN_REQUEST_FAILED
>;
type TGetUpdateUserData = TSimpleAction<typeof UPDATE_USER_DATA> & {
  updatedDataUser: IUpdatedDataUser;
};
type TGetUpdateUserDataRequest = TSimpleAction<typeof UPDATE_USER_DATA_REQUEST>;
type TGetUpdateUserDataRequestFailed = TSimpleAction<
  typeof UPDATE_USER_DATA_REQUEST_FAILED
>;

export type TUserActions =
  | TGetInitialStateForToken
  | TGetUser
  | TGetUserRequest
  | TGetUserRequestFailed
  | TGetLogoutUser
  | TGetEditableData
  | TGetUserEditableDataRequest
  | TGetUserEditableDataRequestFailed
  | TGetUpdateAccessToken
  | TGetUpdateAccessTokenRequest
  | TGetUpdateAccessTokenRequestFailed
  | TGetUpdateUserData
  | TGetUpdateUserDataRequest
  | TGetUpdateUserDataRequestFailed;

export const getInitialStateForToken = (): TGetInitialStateForToken => {
  return {
    type: UPDATE_TOKEN_INITIAL_STATE,
  };
};

export const getUser = (user: IUser): TGetUser => {
  return {
    type: GET_USER,
    user,
  };
};

export const getUserRequest = (): TGetUserRequest => {
  return {
    type: USER_REQUEST,
  };
};

export const getUserRequestFailed = (): TGetUserRequestFailed => {
  return {
    type: USER_REQUEST_FAILED,
  };
};

export const getLogoutUser = (): TGetLogoutUser => {
  return {
    type: LOGOUT_USER,
  };
};

export const getEditableData = (
  editableUser: IUserEditableData
): TGetEditableData => {
  return {
    type: GET_EDITABLE_DATA,
    editableUser,
  };
};

export const getUserEditableDataRequest = (): TGetUserEditableDataRequest => {
  return {
    type: USER_EDITABLE_DATA_REQUEST,
  };
};

export const getUserEditableDataRequestFailed =
  (): TGetUserEditableDataRequestFailed => {
    return {
      type: USER_EDITABLE_DATA_REQUEST_FAILED,
    };
  };

export const getUpdateAccessToken = (
  accessToken: string,
  refreshToken: string
): TGetUpdateAccessToken => {
  return {
    type: UPDATE_ACCESS_TOKEN,
    accessToken,
    refreshToken,
  };
};

export const getUpdateAccessTokenRequest = (): TGetUpdateAccessTokenRequest => {
  return {
    type: UPDATE_ACCESS_TOKEN_REQUEST,
  };
};

export const getUpdateAccessTokenRequestFailed =
  (): TGetUpdateAccessTokenRequestFailed => {
    return {
      type: UPDATE_ACCESS_TOKEN_REQUEST_FAILED,
    };
  };

export const getUpdateUserData = (
  updatedDataUser: IUpdatedDataUser
): TGetUpdateUserData => {
  return {
    type: UPDATE_USER_DATA,
    updatedDataUser,
  };
};

export const getUpdateUserDataRequest = (): TGetUpdateUserDataRequest => {
  return {
    type: UPDATE_USER_DATA_REQUEST,
  };
};

export const getUpdateUserDataRequestFailed =
  (): TGetUpdateUserDataRequestFailed => {
    return {
      type: UPDATE_USER_DATA_REQUEST_FAILED,
    };
  };

export const logoutAction: AppThunk = (token: string) => {
  return function (dispatch: AppDispatch, getState: AppGetState) {
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
        const { wsConnectedSuccess, wsConnected } = getState().wsUserReducer;
        if (wsConnectedSuccess || wsConnected) {
          dispatch(wsUserConnectionClosed());
        }
      })
      .catch((err) => {
        dispatch(getUserRequestFailed());
      });
  };
};

export const getUserDataAction: AppThunk = (accessToken: string) => {
  return function (dispatch: AppDispatch) {
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
};

export const updateAccessTokenAction: AppThunk = (refreshToken: string) => {
  return function (dispatch: AppDispatch) {
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
            ...JSON.parse(localStorage.getItem("user") || "null"),
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
        );
      })
      .catch((err) => {
        dispatch(getUpdateAccessTokenRequestFailed());
      });
  };
};

export const updateUserDataAction: AppThunk = (
  updatedFieldsUser: IUpdatedFieldsUser,
  accessToken: string
) => {
  return function (dispatch: AppDispatch) {
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
      body: JSON.stringify(updatedFieldsUser),
    })
      .then((res) => {
        dispatch(getUpdateUserData(res.user));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user") || "null"),
            user: { name: res.user.name, email: res.user.email },
          })
        );
      })
      .catch((err) => {
        dispatch(getUpdateUserDataRequestFailed());
      });
  };
};
