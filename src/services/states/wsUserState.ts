import { IOrder } from "../../types";

export interface IwsUserInitialState {
  data: null | {
    orders: Array<IOrder>;
    total: number;
    totalToday: number;
  };
  wsConnected: boolean;
  wsError: boolean;
  wsErrorMessage: null | any;
  wsConnectedSuccess: boolean;
  wsConnectionClosed: boolean;
}

export const wsUserInitialState: IwsUserInitialState = {
  data: null,
  wsConnected: false,
  wsError: false,
  wsErrorMessage: null,
  wsConnectedSuccess: false,
  wsConnectionClosed: false,
};
