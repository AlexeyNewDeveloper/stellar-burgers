export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      const { user } = getState().userReducer;
      // if (type === wsInit && user) {
      if (type === wsInit) {
        if (user) {
          socket = new WebSocket(`${wsUrl}?token=${user.accessToken}`);
        } else {
          socket = new WebSocket(wsUrl);
        }
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
          if (data === "ping") {
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

      next(action);
    };
  };
};
