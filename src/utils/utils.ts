import { TYPE_BUN } from "./constants";
import { IIngredient, IOrder } from "../types";

interface IfilterIngredients<A, M> {
  (ingredientsArray: Array<A>, mockup: M): M;
}

export interface IcompositionIngredient {
  quantity: number;
  image: string;
  name: string;
  price: number;
}

export interface IcompositionOrder<T> {
  [name: string]: T;
}

export const filterIngredients: IfilterIngredients<
  IIngredient,
  { [name: string]: Array<IIngredient> }
> = (ingredientsArray, mockup) => {
  return ingredientsArray.reduce((acc, current, index, arr) => {
    if (current.type && current.type in acc) {
      acc[current.type].push(current);
    } else {
      acc.other.push(current);
    }
    return acc;
  }, mockup);
};

export function checkResponse(res: Response): Promise<any> {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function getIngredientsForConstructor(
  data: Array<IIngredient>
): Array<IIngredient> {
  let arrayOfData: Array<IIngredient> = [];
  if (data.length) {
    let flagOneBun = false;
    arrayOfData = data.filter((item) => {
      if (item.type === TYPE_BUN && !flagOneBun) {
        flagOneBun = true;
        return true;
      } else if (item.type !== TYPE_BUN) {
        return true;
      } else {
        return false;
      }
    });
  }
  console.log("data", data);
  return arrayOfData;
}

export function getListOrder(data: {
  bun: IIngredient | null;
  ingredients: Array<IIngredient>;
}): Array<string> | undefined {
  if (data.bun) {
    return [data.bun, ...data.ingredients, data.bun].map((item) => item["_id"]);
  }
}

export function enableObserver<T>({
  targetId,
  rootId,
  optionalFunction,
}: {
  targetId: string;
  rootId: string;
  optionalFunction: React.Dispatch<React.SetStateAction<T>>;
}) {
  const options = {
    root: document.querySelector(`#${rootId}`),
    rootMargin: "0px 0px -90% 0px",
    threshold: 0.6,
  };
  const observerCallback = function (entries: any, observer: any) {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        optionalFunction(entry.target.id);
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, options);

  const target = document.querySelector(`#${targetId}`);
  if (target) {
    observer.observe(target);
  }

  return { observer, target };
}

export function calcTotalPrice(
  arrayIngredients: Array<IIngredient>,
  bun: IIngredient | null
): number {
  let allIngredients: Array<IIngredient>;
  if (bun) {
    allIngredients = arrayIngredients.concat(bun);
  } else {
    allIngredients = arrayIngredients;
  }

  return allIngredients.reduce((acc, current) => {
    if (current.price) {
      return current.type === TYPE_BUN
        ? (acc += current.price * 2)
        : (acc += current.price);
    } else {
      return 0;
    }
  }, 0);
}

export function countItems(
  ingredients: Array<IIngredient>,
  bun: IIngredient | null,
  ...otherIngredient: Array<IIngredient>
): { [name: string]: number } {
  let allIngredients: Array<IIngredient> = [];
  if (bun) {
    allIngredients = ingredients;
    allIngredients.push(bun);
  }
  if (otherIngredient.length && otherIngredient.some((item) => !item)) {
    allIngredients = ingredients;
  } else {
    allIngredients = ingredients.concat(otherIngredient);
  }
  return allIngredients.reduce((acc: { [name: string]: number }, current) => {
    if (current["_id"]) {
      if (current["_id"] in acc) {
        acc[current["_id"]] = acc[current["_id"]] + 1;
      } else {
        acc[current["_id"]] = 1;
      }
    }

    return acc;
  }, {});
}

export function setCookie(name: string, value: string, props: any): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = "";
  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        //eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getCompositionOrder = (
  order: IOrder,
  ingredients: Array<IIngredient>
): {
  arrayIngredientsInOrder: Array<IIngredient>;
  arrayCompositionOrder: Array<IcompositionIngredient>;
} => {
  const arrayIngredientsInOrder: Array<IIngredient> = [];
  const arrayCompositionOrder: Array<IcompositionIngredient> = [];
  const compositionOrder = order.ingredients.reduce(
    (acc: IcompositionOrder<IcompositionIngredient>, id) => {
      const ingredient = getIngredientById(id, ingredients);
      if (ingredient) {
        const { image, name, price, _id } = ingredient;
        arrayIngredientsInOrder.push({ image, name, price, _id });
        if (id in acc) {
          acc[id].quantity += 1;
        } else {
          acc[id] = {
            quantity: 1,
            image,
            name,
            price,
          };
        }
      }
      return acc;
    },
    {}
  );
  for (const key in compositionOrder) {
    arrayCompositionOrder.push(compositionOrder[key]);
  }
  return { arrayIngredientsInOrder, arrayCompositionOrder };
};

export const getIngredientById = (
  id: string,
  ingredients: Array<IIngredient>
): IIngredient | undefined => {
  if (ingredients.length) {
    return ingredients.find((item) => item._id === id);
  }
};

export const countTotalPriceOrder = (
  compositionOrder: Array<IcompositionIngredient | IIngredient>
): number => {
  return compositionOrder.reduce((acc: number, current) => {
    return (acc += current.price);
  }, 0);
};

export const requestTo = async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  let res = null;
  if (options) {
    res = await fetch(url, options);
  } else {
    res = await fetch(url);
  }
  return checkResponse(res).then((res) =>
    res.success ? Promise.resolve(res) : Promise.reject(res)
  );
};

export const getOrderById = (
  id: string,
  orders: Array<IOrder>
): IOrder | undefined => {
  if (orders.length) {
    return orders.find((item) => item._id === id);
  }
};
