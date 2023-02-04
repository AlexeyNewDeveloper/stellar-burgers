import { wsInitialState } from "../states/wsState";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../actions/wsAction";

export const wsReducer = (state = wsInitialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnectedSuccess: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        wsError: true,
        wsErrorMessage: action.payload,
        wsConnectedSuccess: false,
        wsConnectionClosed: false,
      };
    }
    case WS_CONNECTION_CLOSED: {
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
    case WS_GET_MESSAGE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case WS_SEND_MESSAGE: {
      return {};
    }
    default: {
      return state;
    }
  }
};
