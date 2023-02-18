import { RootState } from "../types";
import { IwsInitialState } from "../states/wsState";

export const getWsState = (state: RootState): IwsInitialState =>
  state.wsReducer;
