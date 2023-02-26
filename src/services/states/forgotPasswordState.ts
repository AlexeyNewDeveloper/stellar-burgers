export interface IForgotPasswordInitialState {
  email: null | string;
  forgotPasswordRequest: boolean;
  forgotPasswordRequestSuccess: boolean;
  forgotPasswordRequestFailed: boolean;
}

export const forgotPasswordInitialState: IForgotPasswordInitialState = {
  email: null,
  forgotPasswordRequest: false,
  forgotPasswordRequestSuccess: false,
  forgotPasswordRequestFailed: false,
};
