import { RootState } from "../types";
import { IResetPasswordInitialState } from "../states/resetPasswordState";

export const getResetPasswordState = (
  state: RootState
): IResetPasswordInitialState => state.resetPasswordReducer;
