export interface IResetPasswordInitialState {
  resetPasswordRequest: boolean;
  resetPasswordRequestSuccess: boolean;
  resetPasswordRequestFailed: boolean;
}

export const resetPasswordInitialState: IResetPasswordInitialState = {
  resetPasswordRequest: false,
  resetPasswordRequestSuccess: false,
  resetPasswordRequestFailed: false,
};
