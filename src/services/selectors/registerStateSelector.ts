import { RootState } from "../types";
import { IRegisterInitialState } from "../states/registerState";

export const getRegisterState = (state: RootState): IRegisterInitialState =>
  state.registerReducer;
