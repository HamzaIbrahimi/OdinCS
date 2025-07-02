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
      parent = temp;
      if (value > temp.data) temp = temp.right;
      else if (value < temp.data) temp = temp.left;
      else return;
    }
    const newNode = new Node(value);
    value > parent.data ? (parent.right = newNode) : (parent.left = newNode);
  }

  recInsert(value) {
    const go = (node) => {
      if (node === null) {
        return new Node(value);
      }
      if (value > node.data) node.right = go(node.right);
      if (value < node.data) node.left = go(node.left);

      return node;
    };
    this.root = go(this.root);
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

  recFind(value) {
    const go = (node) => {
      if (node === null) return null;
      if (value === node.data) return node;
      if (value < node.data) return go(node.left);
      return go(node.right);
    };
    return go(this.root);
  }

  delete(node, key) {
    if (node === null) return null;
    if (key < node.data) {
      node.left = this.delete(node.left, key);
    } else if (key > node.data) {
      node.right = this.delete(node.right, key);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      } else {
        let succ = this.inOrd(node.right);
        node.data = succ.data;
        node.right = this.delete(node.right, succ.data);
        return node;
      }
    }
    return node;
  }

  inPre(node) {
    //left subtree then go to the right-most leaf find the maximum value
    while (node && node.right !== null) {
      node = node.right;
    }
    return node;
  }

  inOrd(node) {
    //right subtree then go to the left-most leaf find the minium value
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  height(node) {
    if (node === null) return -1;
    let x = this.height(node.left);
    let y = this.height(node.right);
    return Math.max(x, y) + 1;
  }
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

let ch = new Tree();
