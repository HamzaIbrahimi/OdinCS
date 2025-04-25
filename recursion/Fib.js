function fibs(n) {
  let fibsArray = [0, 1];
  if (n <= 1) return fibsArray;
  if (n < 0) throw new Error('No negative integers');
  const pushNewFib = (arr) => {
    let last = arr.length - 1;
    let beforeLast = arr.length - 2;
    arr.push(arr[last] + arr[beforeLast]);
  };
  for (let i = 0; i < n - 2; i++) {
    pushNewFib(fibsArray);
  }
  return fibsArray;
}

function fibsRec(n, a = [0, 1]) {
  //Solution with a helper argument;
  if (n < 0) throw new Error('No negative integers');
  if (n <= 1) return a;
  if (n === 2) return a;
  else {
    let [last, beforeLast] = [a.length - 1, a.length - 2];
    a.push(a[last] + a[beforeLast]);
    return fibsRec(n - 1, a);
  }
}
console.log(fibsRec(8));

//Another solution with only one argument
function fibsRec2(n) {
  if (n < 0) throw new Error('No negative integers');
  if (n === 0) return [0];
  if (n === 1) return [0, 1];
  else {
    let a = fibsRec2(n - 1);
    let [last, beforeLast] = [a.length - 1, a.length - 2];
    a.push(a[last] + a[beforeLast]);
    return a;
  }
}

console.log(fibsRec2(8));
