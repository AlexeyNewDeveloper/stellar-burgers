import { RootState } from "../types";
import { ILoginInitialState } from "../states/loginState";

export const getLoginState = (state: RootState): ILoginInitialState =>
  state.loginReducer;
