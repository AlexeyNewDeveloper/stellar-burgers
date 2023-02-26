import { WS_URL_FEED_ORDERS } from "../../utils/constants";
import { TSimpleAction, TwsActions } from "./typesActions";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export type TwsEvents =
  | typeof WS_CONNECTION_START
  | typeof WS_CONNECTION_SUCCESS
  | typeof WS_CONNECTION_ERROR
  | typeof WS_CONNECTION_CLOSED
  | typeof WS_GET_MESSAGE
  | typeof WS_SEND_MESSAGE;

export const wsActions: TwsActions<TwsEvents> = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

type TwsInit = TSimpleAction<typeof WS_CONNECTION_START> & {
  wsUrl: typeof WS_URL_FEED_ORDERS;
  wsActions: typeof wsActions;
};
type TwsConnectionSuccess = TSimpleAction<typeof WS_CONNECTION_SUCCESS>;
type TwsConnectionError = TSimpleAction<typeof WS_CONNECTION_ERROR> & {
  payload: any;
};
type TwsConnectionClosed = TSimpleAction<typeof WS_CONNECTION_CLOSED>;
type TwsGetMessage = TSimpleAction<typeof WS_GET_MESSAGE> & {
  payload: any;
};
type TwsSendMessage = TSimpleAction<typeof WS_SEND_MESSAGE> & {
  payload: any;
};

export type TwsEventActions =
  | TwsInit
  | TwsConnectionSuccess
  | TwsConnectionError
  | TwsConnectionClosed
  | TwsGetMessage
  | TwsSendMessage;

export const wsInit = (): TwsInit => {
  return {
    type: WS_CONNECTION_START,
    wsUrl: WS_URL_FEED_ORDERS,
    wsActions: wsActions,
  };
};

export const wsConnectionSuccess = (): TwsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (payload: any): TwsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
    payload,
  };
};

export const wsConnectionClosed = (): TwsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message: any): TwsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsSendMessage = (message: any): TwsSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};
