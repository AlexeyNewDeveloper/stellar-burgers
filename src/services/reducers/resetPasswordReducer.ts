import { resetPasswordInitialState } from "../states/resetPasswordState";
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_INITIAL_STATE,
} from "../actions/resetPasswordAction";
import { IResetPasswordInitialState } from "../states/resetPasswordState";
import { TResetPasswordActions } from "../actions/resetPasswordAction";

export const resetPasswordReducer = (
  state = resetPasswordInitialState,
  action: TResetPasswordActions
): IResetPasswordInitialState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordRequestSuccess: false,
        resetPasswordRequestFailed: false,
      };
    }
    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestSuccess: true,
        resetPasswordRequestFailed: false,
      };
    }
    case RESET_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestSuccess: false,
        resetPasswordRequestFailed: true,
      };
    }
    case RESET_PASSWORD_INITIAL_STATE: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestSuccess: false,
        resetPasswordRequestFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};
