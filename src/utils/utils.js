export default function filterIngredients(ingredientsArray, mockup) {
  return ingredientsArray.reduce((acc, current, index, arr) => {
    if (current.type in acc) {
      acc[current.type].push(current);
    } else {
      acc.other.push(current);
    }
    return acc;
  }, mockup);
}
