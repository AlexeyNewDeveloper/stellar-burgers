export interface ILoginInitialState {
  loginRequest: boolean;
  loginRequestFailed: boolean;
}

export const loginInitialState: ILoginInitialState = {
  loginRequest: false,
  loginRequestFailed: false,
};
