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

export function getDataForConstructor(data) {
  let arrayOfData = [];
  let listOrder = [];
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
  listOrder = getListOrder(arrayOfData);
  return [arrayOfData, listOrder];
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
