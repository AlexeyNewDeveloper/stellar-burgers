import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "../actions/registerAction";
import { registerInitialState } from "../states/registerState";

export const registerReducer = (state = registerInitialState, action) => {
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
