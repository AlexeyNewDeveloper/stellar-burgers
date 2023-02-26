import { RootState } from "../types";
import { IwsUserInitialState } from "../states/wsUserState";

export const getUserWsState = (state: RootState): IwsUserInitialState =>
  state.wsUserReducer;
