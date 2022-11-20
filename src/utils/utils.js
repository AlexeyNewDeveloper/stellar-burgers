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

export function getDataForConstructor({
  data = [],
  restrictedTypes = { bun: 1 },
  deleteItem = false,
}) {
  const arrayOfData = data.slice();
  let totalPrice = 0;
  if (arrayOfData.length) {
    for (let type in restrictedTypes) {
      let counter = 0;
      arrayOfData.forEach((item, index) => {
        if (item.type === type) {
          if (counter < restrictedTypes[type]) {
            counter += 1;
          } else if (deleteItem) {
            console.log(
              `Удален ингредиент: ${arrayOfData[index].name}. Тип: ${arrayOfData[index].type}`
            );
            delete arrayOfData[index];
          }
        }
      });
    }
  }
  totalPrice = calculateTotalPrice(arrayOfData);
  return [arrayOfData, totalPrice];
}

export function calculateTotalPrice(ingredients) {
  return ingredients.reduce((acc, current) => {
    return (acc += current.price);
  }, 0);
}
