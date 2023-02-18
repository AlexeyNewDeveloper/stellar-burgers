export interface IMakeOrderInitialState {
  orderObj: {
    number: null | number;
    listIngredientsOrder: Array<string>;
  };
  makeOrderRequest: boolean;
  makeOrderRequestSuccess: boolean;
  makeOrderFailed: boolean;
}

export const makeOrderInitialState: IMakeOrderInitialState = {
  orderObj: {
    number: null,
    listIngredientsOrder: [],
  },
  makeOrderRequest: false,
  makeOrderRequestSuccess: false,
  makeOrderFailed: false,
};
