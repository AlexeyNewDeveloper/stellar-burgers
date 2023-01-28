export const socketUserMiddleware = (wsUrl, wsUserActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsUserActions;
      const { user } = getState().userReducer;
      // if (type === wsInit && user) {
      if (type === wsInit && user) {
        // console.log(user);
        const token = user.accessToken.split("Bearer ")[1];
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
          // console.log("connect ws user");
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
          // console.log("ws user data: ", parsedData);
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
