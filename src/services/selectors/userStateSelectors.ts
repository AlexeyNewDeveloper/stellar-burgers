import { RootState } from "../types";
import { IUserInitialState } from "../states/userState";

export const getUserState = (state: RootState): IUserInitialState =>
  state.userReducer;

// export const getUserOrdersHistoryState = (state) =>
//   state.userReducer.userOrdersHistory;
