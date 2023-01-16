function sortArr(arr) {
  // Remove duplicates
  arr = [...new Set(arr)];

  // Sort array
  arr.sort((a, b) => a - b);

  return arr;
}

export default sortArr;
