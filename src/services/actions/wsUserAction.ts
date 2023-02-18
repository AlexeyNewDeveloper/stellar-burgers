import { WS_URL_USER_ORDERS_HISTORY } from "../../utils/constants";
import { TSimpleAction, TwsActions } from "./typesActions";

export const WS_USER_CONNECTION_START: "WS_USER_USER_CONNECTION_START" =
  "WS_USER_USER_CONNECTION_START";
export const WS_USER_CONNECTION_SUCCESS: "WS_USER_CONNECTION_SUCCESS" =
  "WS_USER_CONNECTION_SUCCESS";
export const WS_USER_CONNECTION_ERROR: "WS_USER_CONNECTION_ERROR" =
  "WS_USER_CONNECTION_ERROR";
export const WS_USER_CONNECTION_CLOSED: "WS_USER_CONNECTION_CLOSED" =
  "WS_USER_CONNECTION_CLOSED";
export const WS_USER_GET_MESSAGE: "WS_USER_GET_MESSAGE" = "WS_USER_GET_MESSAGE";
export const WS_USER_SEND_MESSAGE: "WS_USER_SEND_MESSAGE" =
  "WS_USER_SEND_MESSAGE";

type TwsEvents =
  | typeof WS_USER_CONNECTION_START
  | typeof WS_USER_CONNECTION_SUCCESS
  | typeof WS_USER_CONNECTION_ERROR
  | typeof WS_USER_CONNECTION_CLOSED
  | typeof WS_USER_GET_MESSAGE
  | typeof WS_USER_SEND_MESSAGE;

export const wsUserActions: TwsActions<TwsEvents> = {
  wsInit: WS_USER_CONNECTION_START,
  wsSendMessage: WS_USER_SEND_MESSAGE,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE,
};

type TwsUserInit = TSimpleAction<typeof WS_USER_CONNECTION_START> & {
  wsUrl: typeof WS_URL_USER_ORDERS_HISTORY;
  wsActions: typeof wsUserActions;
};
type TwsUserConnectionSuccess = TSimpleAction<
  typeof WS_USER_CONNECTION_SUCCESS
>;
type TwsUserConnectionError = TSimpleAction<typeof WS_USER_CONNECTION_ERROR> & {
  payload: any;
};
type TwsUserConnectionClosed = TSimpleAction<typeof WS_USER_CONNECTION_CLOSED>;
type TwsUserGetMessage = TSimpleAction<typeof WS_USER_GET_MESSAGE> & {
  payload: any;
};
type TwsUserSendMessage = TSimpleAction<typeof WS_USER_SEND_MESSAGE> & {
  payload: any;
};

export type TwsUserEventActions =
  | TwsUserInit
  | TwsUserConnectionSuccess
  | TwsUserConnectionError
  | TwsUserConnectionClosed
  | TwsUserGetMessage
  | TwsUserSendMessage;

export const wsUserInit = (): TwsUserInit => {
  return {
    type: WS_USER_CONNECTION_START,
    wsUrl: WS_URL_USER_ORDERS_HISTORY,
    wsActions: wsUserActions,
  };
};

export const wsUserConnectionSuccess = (): TwsUserConnectionSuccess => {
  return {
    type: WS_USER_CONNECTION_SUCCESS,
  };
};

export const wsUserConnectionError = (payload: any): TwsUserConnectionError => {
  return {
    type: WS_USER_CONNECTION_ERROR,
    payload,
  };
};

export const wsUserConnectionClosed = (): TwsUserConnectionClosed => {
  return {
    type: WS_USER_CONNECTION_CLOSED,
  };
};

export const wsUserGetMessage = (message: any): TwsUserGetMessage => {
  return {
    type: WS_USER_GET_MESSAGE,
    payload: message,
  };
};

export const wsUserSendMessage = (message: any): TwsUserSendMessage => {
  return {
    type: WS_USER_SEND_MESSAGE,
    payload: message,
  };
};
