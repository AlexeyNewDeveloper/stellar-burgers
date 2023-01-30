import { WS_URL_USER_ORDERS_HISTORY } from "../../utils/constants";

export const WS_USER_CONNECTION_START = "WS_USER_USER_CONNECTION_START";
export const WS_USER_CONNECTION_SUCCESS = "WS_USER_CONNECTION_SUCCESS";
export const WS_USER_CONNECTION_ERROR = "WS_USER_CONNECTION_ERROR";
export const WS_USER_CONNECTION_CLOSED = "WS_USER_CONNECTION_CLOSED";
export const WS_USER_GET_MESSAGE = "WS_USER_GET_MESSAGE";
export const WS_USER_SEND_MESSAGE = "WS_USER_SEND_MESSAGE";

export const wsUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  wsSendMessage: WS_USER_SEND_MESSAGE,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE,
};

export const wsUserInit = () => {
  return {
    type: WS_USER_CONNECTION_START,
    wsUrl: WS_URL_USER_ORDERS_HISTORY,
    wsActions: wsUserActions,
  };
};

export const wsUserConnectionSuccess = () => {
  return {
    type: WS_USER_CONNECTION_SUCCESS,
  };
};

export const wsUserConnectionError = () => {
  return {
    type: WS_USER_CONNECTION_ERROR,
  };
};

export const wsUserConnectionClosed = () => {
  return {
    type: WS_USER_CONNECTION_CLOSED,
  };
};

export const wsUserGetMessage = (message) => {
  return {
    type: WS_USER_GET_MESSAGE,
    payload: message,
  };
};

export const wsUserSendMessage = (message) => {
  return {
    type: WS_USER_SEND_MESSAGE,
    payload: message,
  };
};
