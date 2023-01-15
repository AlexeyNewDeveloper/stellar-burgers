import {
  GET_USER,
  LOGOUT_USER,
  USER_REQUEST_FAILED,
  USER_REQUEST,
} from "../actions/userAction";
import { userInitialState } from "../states/userState";
import { setCookie } from "../../utils/utils";

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case GET_USER: {
      setCookie("refreshToken", action.user?.refreshToken);
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
        userRequest: false,
        userRequestFailed: false,
      };
    }

    default: {
      return state;
    }
  }
};
