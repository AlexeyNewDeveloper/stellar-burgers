import { TYPE_BUN } from "./constants";

export function filterIngredients(ingredientsArray, mockup) {
  return ingredientsArray.reduce((acc, current, index, arr) => {
    if (current.type in acc) {
      acc[current.type].push(current);
    } else {
      acc.other.push(current);
    }
    return acc;
  }, mockup);
}

export function checkResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function getIngredientsForConstructor(data) {
  let arrayOfData = [];
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
  return arrayOfData;
}

export function getListOrder(data) {
  return [data.bun, ...data.ingredients, data.bun].map((item) => item["_id"]);
}

export function enableObserver({ targetId, rootId, optionalFunction }) {
  const options = {
    root: document.querySelector(`#${rootId}`),
    rootMargin: "0px 0px -90% 0px",
    threshold: 0.6,
  };
  const observerCallback = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        optionalFunction(entry.target.id);
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, options);

  const target = document.querySelector(`#${targetId}`);
  observer.observe(target);
  return [observer, target];
}

export function calcTotalPrice(arrayIngredients, bun) {
  const allIngredients = arrayIngredients.concat(bun ? bun : { price: 0 });
  return allIngredients.reduce((acc, current) => {
    return current.type === TYPE_BUN
      ? (acc += current.price * 2)
      : (acc += current.price);
  }, 0);
}

export function countItems(ingredients, ...otherIngredient) {
  let allIngredients = [];
  if (otherIngredient.some((item) => !item)) {
    allIngredients = ingredients;
  } else {
    allIngredients = ingredients.concat(otherIngredient);
  }
  return allIngredients.reduce((acc, current) => {
    if (current["_id"] in acc) {
      acc[current["_id"]] = acc[current["_id"]] + 1;
    } else {
      acc[current["_id"]] = 1;
    }
    return acc;
  }, {});
}

// export function setCookie(name, value, props) {
//   props = props || {};
//   let exp = props.expires;
//   if (typeof exp == "number" && exp) {
//     const d = new Date();
//     d.setTime(d.getTime() + exp * 1000);
//     exp = props.expires = d;
//   }
//   if (exp && exp.toUTCString) {
//     props.expires = exp.toUTCString();
//   }
//   value = encodeURIComponent(value);
//   let updatedCookie = name + "=" + value;
//   for (const propName in props) {
//     updatedCookie += "; " + propName;
//     const propValue = props[propName];
//     if (propValue !== true) {
//       updatedCookie += "=" + propValue;
//     }
//   }

//   document.cookie = "";
//   document.cookie = updatedCookie;
// }

// export function getCookie(name) {
//   const matches = document.cookie.match(
//     new RegExp(
//       "(?:^|; )" +
//         name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
//         "=([^;]*)"
//     )
//   );
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }
