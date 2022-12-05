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
      if (item.type === "bun" && !flagOneBun) {
        flagOneBun = true;
        return true;
      } else if (item.type !== "bun") {
        return true;
      } else {
        return false;
      }
    });
  }
  return arrayOfData;
}

export function getListOrder(arrayOfData) {
  const listOrder = [];
  arrayOfData.forEach((item) => {
    if (item.type === "bun") {
      listOrder.push(item["_id"]);
      listOrder.push(item["_id"]);
    } else {
      listOrder.push(item["_id"]);
    }
  });
  return listOrder;
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
}

export function calcTotalPrice(arrayIngredients, ...otherIngredient) {
  const allIngredients = arrayIngredients.concat(otherIngredient);
  return allIngredients.reduce((acc, current) => {
    return current.type === "bun"
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
