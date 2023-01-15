import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/loginAction";
import { loginInitialState } from "../states/loginState";

export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        userData: action.userData,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
