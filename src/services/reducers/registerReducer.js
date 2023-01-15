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
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerData: action.registerData,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerRequestFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
