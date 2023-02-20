export interface IIngredient {
  [name: string]: number | string | undefined;
  calories?: number;
  carbohydrates?: number;
  fat?: number;
  image?: string;
  image_large?: string;
  image_mobile?: string;
  name?: string;
  price?: number;
  proteins?: number;
  type?: string;
  __v?: number;
  _id?: string;
  uuid?: string;
}

export interface IUserData {
  email: string;
  name: string;
  password: string;
}

export interface IUser {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: { email: string; name: string };
}

export interface IUserEditableData
  extends Omit<IUser, "accessToken" | "refreshToken"> {}

export interface IUpdatedDataUser extends Omit<IUserData, "password"> {}

export interface IUpdatedFieldsUser extends Partial<IUserData> {}

export interface IOrder {
  readonly createdAt: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}

export interface IFormInputs {
  name?: string;
  email?: string;
  password?: string;
}
