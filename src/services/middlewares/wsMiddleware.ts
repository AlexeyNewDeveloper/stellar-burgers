import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { TwsActions } from "../actions/typesActions";
import { TwsEvents } from "../actions/wsAction";
import { TwsUserEvents } from "../actions/wsUserAction";

export const socketMiddleware: Middleware<{}, RootState> = (store) => {
  // return () => {
  let socket: WebSocket | null = null;
  let wsUrl: string | null = null;
  let wsActions: TwsActions<TwsEvents | TwsUserEvents> | null = null;

  return (next) => (action) => {
    if (action.wsUrl && action.wsActions) {
      wsUrl = action.wsUrl;
      wsActions = action.wsActions;
    }
    if (wsUrl && wsActions) {
      const { dispatch, getState } = store;
      // const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      }
      const { user } = getState().userReducer;
      if (type === wsInit && user && user.accessToken) {
        const token = user.accessToken.split("Bearer ")[1];
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;

          if (data === "ping" && socket) {
            socket.send("pong");
          }
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        // if (type === wsSendMessage) {
        //   const message = payload;
        //   message.token = user.accessToken;
        //   socket.send(JSON.stringify(message));
        // }
      }
    }
    next(action);
    // };
  };
};
