//Question 1
function sumTo(n) {
  if (n === 1) return 1;
  return n + sumTo(n - 1);
}
//Question 2
function fact(n) {
  if (n === 1) return 1;
  return n * fact(n - 1);
}
//Question 3
function pow(x, y) {
  if (y === 1) return x;
  return x * pow(x, y - 1);
}
//Question 4
function all(array, callback) {
  if (array.length === 0) return true;
  if (callback(array[0])) {
    return all(array.slice(1), callback);
  }
  return false;
}
//Question 5
function productOfArray(array) {
  if (array.length === 0) return 1;
  return array[0] * productOfArray(array.slice(1));
}

//Question 6
function contains(o, value) {
  for (const key in o) {
    if (typeof o[key] === 'object') {
      return contains(o[key], value);
    } else if (o[key] === value) {
      return true;
    }
  }
  return false;
}

//Question 7
function totalIntegers(array) {
  if (array.length === 0) {
    return 0;
  }
  if (typeof array[0] === 'number') {
    return 1 + totalIntegers(array.slice(1));
  } else if (Array.isArray(array[0])) {
    return totalIntegers(array[0]) + totalIntegers(array.slice(1));
  } else {
    return 0 + totalIntegers(array.slice(1));
  }
}

//Question 8
let square = (x) => x * x;
function sumSquares(array) {
  if (array.length === 0) return 0;
  let total = 0;
  if (Array.isArray(array[0])) {
    return sumSquares(array[0]) + sumSquares(array.slice(1));
  } else {
    return square(array[0]) + sumSquares(array.slice(1));
  }
}
var l = [1, 2, 3];
console.log(sumSquares(l)); // 14

l = [[1, 2], 3];
console.log(sumSquares(l)); // 14

l = [[[[[[[[[1]]]]]]]]];
console.log(sumSquares(l)); // 1

l = [10, [[10], 10], [10]];
console.log(sumSquares(l)); // 400
//Question 9
function replicate(times, n) {
  if (times < 1) return [];
  if (times === 1) return [n];
  return [n].concat(replicate(times - 1, n));
}
