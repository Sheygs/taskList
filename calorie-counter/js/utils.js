let isError = false;

function cleanInputString(str = '') {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str = '') {
  const regex = /\d+e\d+/;
  return str.match(regex);
}

function getCaloriesFromInputs(list = []) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);

    const invalidInputMatch = isInvalidInput(currVal);

    console.log({ currVal, invalidInputMatch });

    if (invalidInputMatch) {
      alert(`invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }

    calories += Number(currVal);
  }

  return calories;
}

export { getCaloriesFromInputs, isError };
