export interface IRegisterInitialState {
  registerRequestSuccess: boolean;
  registerRequest: boolean;
  registerRequestFailed: boolean;
}

export const registerInitialState: IRegisterInitialState = {
  registerRequestSuccess: false,
  registerRequest: false,
  registerRequestFailed: false,
};
