import { prettyPrint } from './print.js';
class Node {
  constructor(data) {
    this.left = null;
    this.data = data;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    this.array = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.#buildTree(this.array, 0, this.array.length - 1);
  }

  #buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);
    return root;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let temp = this.root;
    let parent = null;
    while (temp !== null) {
      if (value > temp.data) {
        parent = temp;
        temp = temp.right;
      } else if (value < temp.data) {
        parent = temp;
        temp = temp.left;
      } else {
        return;
      }
    }
    const newNode = new Node(value);
    value > parent.data ? (parent.right = newNode) : (parent.left = newNode);
  }

  find(value) {
    if (this.root === null) return null;
    let temp = this.root;
    while (temp !== null) {
      if (value > temp.data) {
        temp = temp.right;
      } else if (value < temp.data) {
        temp = temp.left;
      } else return temp;
    }
    return null;
  }
}

let check = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(check.root);
console.log(check.find(4));
