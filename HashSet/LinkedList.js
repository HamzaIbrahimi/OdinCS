class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

export default class LinkedList {
  #size;
  constructor() {
    this.head = null;
    this.#size = 0;
  }

  push(value) {
    if (this.contains(value)) {
      return;
    }
    this.head = new Node(value, this.head);
    this.#size++;
  }

  contains(value) {
    for (let node = this.head; node !== null; node = node.next) {
      if (node.value === value) {
        return true;
      }
    }
    return false;
  }

  at(value) {
    let index = 0;
    for (let node = this.head; node !== null; node = node.next) {
      if (node.value === value) {
        return index;
      }
      index++;
    }
    return -1;
  }

  find(i) {
    if (i < 0 || i >= this.#size) {
      throw new Error('Index out of bounds');
    }
    let index = 0;
    for (let node = this.head; node !== null; node = node.next) {
      if (i === index) {
        return node;
      }
      index++;
    }
  }

  remove(value) {
    if (!this.contains(value)) {
      return false;
    }
    let index = this.at(value);
    if (index === 0) {
      this.head = this.head.next;
      this.#size--;
      return true;
    }
    let beforeValue = this.find(index - 1);
    let currentValue = this.find(index);
    beforeValue.next = currentValue.next;
    this.#size--;
    return true;
  }

  size() {
    return this.#size;
  }

  values() {
    let valueArray = [];
    for (let node = this.head; node !== null; node = node.next) {
      valueArray.push(node.value);
    }
    return valueArray;
  }
}
