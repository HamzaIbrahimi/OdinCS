class Node {
  key;
  value;
  next;

  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

export default class LinkedList {
  #head;
  #size;

  constructor() {
    this.#head = null;
    this.#size = 0;
  }

  isEmpty() {
    return this.#head === null;
  }

  size() {
    return this.#size;
  }

  head() {
    return this.#head;
  }

  push(key, value) {
    for (let node = this.#head; node !== null; node = node.next) {
      if (node.key === key) {
        node.value = value;
        return;
      }
    }
    this.#head = new Node(key, value, this.#head);
    this.#size++;
  }

  at(i) {
    if (i < 0 || i > this.#size - 1) {
      throw new Error(
        `Index out of bounds for linkedList of size: ${this.#size}`
      );
    }
    let index = 0;
    for (let node = this.#head; node !== null; node = node.next) {
      if (index === i) {
        return node;
      }
      index++;
    }
    return null;
  }

  findIndexOfKey(key) {
    let index = 0;
    for (let node = this.#head; node !== null; node = node.next) {
      if (node.key === key) {
        return index;
      }
      index++;
    }
    return -1;
  }

  get(key) {
    for (let node = this.#head; node !== null; node = node.next) {
      if (node.key === key) {
        return node.value;
      }
    }

    return null;
  }

  remove(key) {
    if (this.isEmpty()) {
      throw new Error('LinkedList is empty');
    }

    const keyIndex = this.findIndexOfKey(key);
    if (keyIndex === -1) {
      throw new Error(`Key "${key}" not found in linkedList`);
    }

    if (keyIndex === 0) {
      this.#head = this.#head.next;
      this.#size--;
      return;
    }
    const keyNode = this.at(keyIndex);
    const beforeKey = this.at(keyIndex - 1);
    beforeKey.next = keyNode.next;
    this.#size--;
    return;
  }

  toString() {
    let str = '';
    for (let node = this.#head; node !== null; node = node.next) {
      str += `(key: ${node.key}: value: ${node.value}) -> `;
    }
    return str + 'null';
  }

  keyValueArray() {
    let array = [];
    for (let node = this.#head; node !== null; node = node.next) {
      array.push([node.key, node.value]);
    }
    return array;
  }
}
