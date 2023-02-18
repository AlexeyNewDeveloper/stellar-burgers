import { RootState } from "../types";
import { IMakeOrderInitialState } from "../states/makeOrderState";

export const getMakeOrderState = (state: RootState): IMakeOrderInitialState =>
  state.makeOrderReducer;
