import { forgotPasswordInitialState } from "../states/forgotPasswordState";
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAILED,
  FORGOT_PASSWORD_INITIAL_STATE,
} from "../actions/forgotPasswordAction";
import { TForgotPasswordActions } from "../actions/forgotPasswordAction";
import { IForgotPasswordInitialState } from "../states/forgotPasswordState";

export const forgotPasswordReducer = (
  state = forgotPasswordInitialState,
  action: TForgotPasswordActions
): IForgotPasswordInitialState => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordRequestSuccess: false,
        forgotPasswordRequestFailed: false,
      };
    }
    case FORGOT_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestSuccess: true,
        forgotPasswordRequestFailed: false,
      };
    }
    case FORGOT_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestSuccess: false,
        forgotPasswordRequestFailed: true,
      };
    }
    case FORGOT_PASSWORD_INITIAL_STATE: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestSuccess: false,
        forgotPasswordRequestFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};
