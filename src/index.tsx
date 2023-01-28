import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers/rootReducer";
import { socketMiddleware } from "./services/middlewares/wsMiddleware";
import { wsActions } from "./services/actions/wsAction";
import { wsUserActions } from "./services/actions/wsUserAction";
import { socketUserMiddleware } from "./services/middlewares/wsUserMiddleware";

declare const window: any;

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsUrlUserOrders = "wss://norma.nomoreparties.space/orders";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, wsActions),
    socketUserMiddleware(wsUrlUserOrders, wsUserActions)
  )
);

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
