export type TSimpleAction<T> = {
  readonly type: T;
};

export type TwsActions<T> = {
  [nameEvent: string]: T;
};
