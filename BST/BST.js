import Queue from './Queue.js';
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

  height(value) {
    let fNode = this.find(value);
    if (fNode === null) {
      return null;
    }

    const getHeight = (node) => {
      if (node === null) return -1;
      let x = getHeight(node.left);
      let y = getHeight(node.right);
      return Math.max(x, y) + 1;
    };

    return getHeight(fNode);
  }

  depth(value) {
    let temp = this.root;
    let count = 0;
    while (temp !== null) {
      if (value < temp.data) {
        temp = temp.left;
        count++;
      } else if (value > temp.data) {
        temp = temp.right;
        count++;
      } else {
        return count;
      }
    }
    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'A callback function is required for the levelOrder method'
      );
    }
    let queue = new Queue();
    if (this.root === null) {
      throw new Error("There's no tree to follow");
    }
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      let currentNode = queue.dequeue();
      callback(currentNode.data);
      if (currentNode.data.left) {
        queue.enqueue(currentNode.data.left);
      }
      if (currentNode.data.right) {
        queue.enqueue(currentNode.data.right);
      }
    }
  }

  inOrder(node, callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'A callback function is required for the levelOrder method'
      );
    }
    if (node) {
      this.inOrder(node.left, callback);
      callback(node);
      this.inOrder(node.right, callback);
    }
  }

  preOrder(node, callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'A callback function is required for the levelOrder method'
      );
    }
    if (node) {
      callback(node);
      this.inOrder(node.left, callback);
      this.inOrder(node.right, callback);
    }
  }

  postOrder(node, callback) {
    if (typeof callback !== 'function') {
      throw new Error(
        'A callback function is required for the levelOrder method'
      );
    }
    if (node) {
      this.inOrder(node.left, callback);
      this.inOrder(node.right, callback);
      callback(node);
    }
  }

  isBalanced() {
    if (this.root === null) return true;
    let queue = new Queue();
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      let currentNode = queue.dequeue();
      let leftHeight = currentNode.data.left
        ? this.height(currentNode.data.left.data)
        : -1;
      let rightHeight = currentNode.data.right
        ? this.height(currentNode.data.right.data)
        : -1;
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }
      if (currentNode.data.left) {
        queue.enqueue(currentNode.data.left);
      }
      if (currentNode.data.right) {
        queue.enqueue(currentNode.data.right);
      }
    }
    return true;
  }

  rebalance() {
    if (this.isBalanced()) {
      throw new Error('Tree is already Balanced!');
    }
    const arr = [];
    this.inOrder(this.root, (x) => arr.push(x.data));
    this.root = this.#buildTree(arr, 0, arr.length - 1);
  }
}
