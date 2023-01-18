import {
  GET_USER,
  LOGOUT_USER,
  USER_REQUEST_FAILED,
  USER_REQUEST,
  GET_EDITABLE_DATA,
  USER_EDITABLE_DATA_REQUEST,
  USER_EDITABLE_DATA_REQUEST_FAILED,
  UPDATE_ACCESS_TOKEN,
  UPDATE_ACCESS_TOKEN_REQUEST,
  UPDATE_ACCESS_TOKEN_REQUEST_FAILED,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_REQUEST_FAILED,
} from "../actions/userAction";
import { userInitialState } from "../states/userState";
import { getCookie, setCookie } from "../../utils/utils";

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        user: action.user,
        userRequest: false,
        userRequestFailed: false,
      };
    }
    case USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userRequestFailed: false,
      };
    }
    case USER_REQUEST_FAILED: {
      return {
        ...state,
        userRequest: false,
        userRequestFailed: true,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        editableUser: null,
        userRequest: false,
        userRequestFailed: false,
      };
    }
    case GET_EDITABLE_DATA: {
      return {
        ...state,
        editableUser: action.editableUser,
        editableDataRequest: false,
        editableDataRequestFailed: false,
      };
    }
    case USER_EDITABLE_DATA_REQUEST: {
      return {
        ...state,
        editableDataRequest: true,
        editableDataRequestFailed: false,
      };
    }
    case USER_EDITABLE_DATA_REQUEST_FAILED: {
      return {
        ...state,
        editableDataRequest: false,
        editableDataRequestFailed: true,
      };
    }
    case UPDATE_ACCESS_TOKEN: {
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
        },
        updateTokenRequest: false,
        updateTokenRequestFailed: false,
      };
    }
    case UPDATE_ACCESS_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenRequestFailed: false,
      };
    }
    case UPDATE_ACCESS_TOKEN_REQUEST_FAILED: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenRequestFailed: true,
      };
    }
    case UPDATE_USER_DATA: {
      const user = {
        name: action.updatedDataUser.name,
        email: action.updatedDataUser.email,
      };
      return {
        ...state,
        user: { ...state.user, user: user },
        editableUser: { ...state.editableUser, user: user },
        updateUserDataSuccess: true,
        updateUserDataRequest: false,
        updateUserDataRequestFailed: false,
      };
    }
    case UPDATE_USER_DATA_REQUEST: {
      return {
        ...state,
        updateUserDataSuccess: false,
        updateUserDataRequest: true,
        updateUserDataRequestFailed: false,
      };
    }
    case UPDATE_USER_DATA_REQUEST_FAILED: {
      return {
        ...state,
        updateUserDataSuccess: false,
        updateUserDataRequest: false,
        updateUserDataRequestFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
