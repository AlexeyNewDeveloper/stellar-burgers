import { RootState } from "../types";
import { IForgotPasswordInitialState } from "../states/forgotPasswordState";

export const getForgotPasswordState = (
  state: RootState
): IForgotPasswordInitialState => state.forgotPasswordReducer;
