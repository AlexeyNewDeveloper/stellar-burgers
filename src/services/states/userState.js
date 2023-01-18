export const userInitialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  userRequest: false,
  userRequestFailed: false,
  editableUser: null,
  editableDataRequest: false,
  editableDataRequestFailed: false,
  updateTokenRequest: false,
  updateTokenRequestFailed: false,
  updateUserDataSuccess: false,
  updateUserDataRequest: false,
  updateUserDataRequestFailed: false,
};
