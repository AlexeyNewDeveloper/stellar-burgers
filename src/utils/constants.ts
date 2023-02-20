export interface ICATEGORIES {
  [name: string]: string;
  main: string;
  bun: string;
  sauce: string;
}

export interface ISPECIFICATIONS {
  [name: string]: string;
  calories: string;
  proteins: string;
  fat: string;
  carbohydrates: string;
}

export const TYPE_BUN: "bun" = "bun";
export const TYPE_SAUCE: "sauce" = "sauce";
export const TYPE_MAIN: "main" = "main";

export const SPECIFICATIONS: ISPECIFICATIONS = {
  calories: "Калории,ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

export const CATEGORIES: ICATEGORIES = {
  main: "Начинки",
  bun: "Булки",
  sauce: "Соусы",
};

export const MODAL_ROOT: HTMLElement | null = document.getElementById("modals");
export const URL_FOR_GET_DATA: "https://norma.nomoreparties.space/api" =
  "https://norma.nomoreparties.space/api";

export const MAX_NUMBER_OF_ORDER_NUMBERS_IN_LIST: 20 = 20;
export const ORDER_STATUS_DONE: "done" = "done";
export const ORDER_STATUS_AT_WORK: "pending" = "pending";
export const ORDER_STATUS_CREATED: "created" = "created";

export const WS_URL_FEED_ORDERS: "wss://norma.nomoreparties.space/orders/all" =
  "wss://norma.nomoreparties.space/orders/all";
export const WS_URL_USER_ORDERS_HISTORY: "wss://norma.nomoreparties.space/orders" =
  "wss://norma.nomoreparties.space/orders";
