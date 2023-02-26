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

export const TYPE_BUN = "bun" as const;
export const TYPE_SAUCE = "sauce" as const;
export const TYPE_MAIN = "main" as const;

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
export const URL_FOR_GET_DATA =
  "https://norma.nomoreparties.space/api" as const;

export const MAX_NUMBER_OF_ORDER_NUMBERS_IN_LIST = 20 as const;
export const ORDER_STATUS_DONE = "done" as const;
export const ORDER_STATUS_AT_WORK = "pending" as const;
export const ORDER_STATUS_CREATED = "created" as const;

export const WS_URL_FEED_ORDERS =
  "wss://norma.nomoreparties.space/orders/all" as const;
export const WS_URL_USER_ORDERS_HISTORY =
  "wss://norma.nomoreparties.space/orders" as const;
