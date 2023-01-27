export const userInitialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  // userOrdersHistory: [],
  // userOrdersHistory: {

  // },
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
