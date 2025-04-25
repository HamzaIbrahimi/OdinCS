const split = (list) => {
  let mid = Math.floor(list.length / 2);
  return [list.slice(0, mid), list.slice(mid, list.length)];
};

const indivisible = (list) => list.length <= 1;

function merge(left, right) {
  let mergedArray = [];
  let [lenL, lenR] = [left.length, right.length];
  let [i, j, m] = [0, 0, 0];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      mergedArray[m++] = left[i++];
    } else {
      mergedArray[m++] = right[j++];
    }
  }
  for (; i < lenL; i++) {
    mergedArray[m++] = left[i];
  }
  for (; j < lenR; j++) {
    mergedArray[m++] = right[j];
  }

  return mergedArray;
}

function mergeSort(array) {
  if (indivisible(array)) {
    return array;
  } else {
    let [left, right] = split(array);
    return merge(mergeSort(left), mergeSort(right));
  }
}

let test1 = [3, 2, 1, 13, 8];
let test2 = [105, 79, 100, 110];
console.log(mergeSort(test1));
console.log(mergeSort(test2));
let rand = () => Math.floor(Math.random() * 10_000_000) + 1;

let a = Array.from({ length: 1_000_000 }, (_, i) => rand());
console.time('mergeSort');
process.stdout.write('For 1 million random int array elements, time -> ');
mergeSort(a);
console.timeEnd('mergeSort');
