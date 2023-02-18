import { IUser, IUserEditableData } from "../../types";

export interface IUserInitialState {
  user: Partial<IUser> | null;
  // user: IUser | null | boolean;
  userRequest: boolean;
  userRequestFailed: boolean;
  editableUser: Partial<IUserEditableData> | null;
  editableDataRequest: boolean;
  editableDataRequestSuccess: boolean;
  editableDataRequestFailed: boolean;
  updateTokenRequestSuccess: boolean;
  updateTokenRequest: boolean;
  updateTokenRequestFailed: boolean;
  updateUserDataSuccess: boolean;
  updateUserDataRequest: boolean;
  updateUserDataRequestFailed: boolean;
}

export const userInitialState: IUserInitialState = {
  user: JSON.parse(localStorage.getItem("user") || "") || null,
  // userOrdersHistory: [],
  // userOrdersHistory: null,
  userRequest: false,
  userRequestFailed: false,
  editableUser: null,
  editableDataRequest: false,
  editableDataRequestSuccess: false,
  editableDataRequestFailed: false,
  updateTokenRequestSuccess: false,
  updateTokenRequest: false,
  updateTokenRequestFailed: false,
  updateUserDataSuccess: false,
  updateUserDataRequest: false,
  updateUserDataRequestFailed: false,
};
