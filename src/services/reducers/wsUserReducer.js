import { wsUserInitialState } from "../states/wsUserState";
import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE,
} from "../actions/wsUserAction";

export const wsUserReducer = (state = wsUserInitialState, action) => {
  switch (action.type) {
    case WS_USER_CONNECTION_START: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_USER_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnectedSuccess: true,
      };
    }
    case WS_USER_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        wsError: true,
        wsErrorMessage: action.payload,
        wsConnectedSuccess: false,
        wsConnectionClosed: false,
      };
    }
    case WS_USER_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnectionClosed: true,
        data: null,
        wsConnected: false,
        wsError: false,
        wsErrorMessage: null,
        wsConnectedSuccess: false,
      };
    }
    case WS_USER_GET_MESSAGE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case WS_USER_SEND_MESSAGE: {
      return {};
    }
    default: {
      return state;
    }
  }
};
