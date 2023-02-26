import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "../actions/registerAction";
import { registerInitialState } from "../states/registerState";
import { IRegisterInitialState } from "../states/registerState";
import { TRegisterActions } from "../actions/registerAction";

export const registerReducer = (
  state = registerInitialState,
  action: TRegisterActions
): IRegisterInitialState => {
  switch (action.type) {
    case REGISTRATION: {
      return {
        ...state,
        registerRequest: true,
        registerRequestSuccess: false,
        registerRequestFailed: false,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registerRequestSuccess: true,
        registerRequest: false,
        registerRequestFailed: false,
        // registerData: action.registerData,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registerRequestSuccess: false,
        registerRequest: false,
        registerRequestFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
