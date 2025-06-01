class Node {
  constructor() {
    this.value = null;
    this.nextNode = null;
  }
}

export default class LinkedList {
  #head;
  #tail;
  #size;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  isEmpty() {
    return this.#head === null;
  }

  append(value) {
    let oldTail = this.#tail;
    this.#tail = new Node();
    this.#tail.value = value;
    if (this.isEmpty()) {
      this.#head = this.#tail;
    } else {
      oldTail.nextNode = this.#tail;
    }
    this.#size++;
  }

  prepend(value) {
    let oldHead = this.#head;
    this.#head = new Node();
    this.#head.value = value;
    if (this.isEmpty()) {
      this.#tail = this.#head;
    } else {
      this.#head.nextNode = oldHead;
    }
    this.#size++;
  }

  size() {
    return this.#size;
  }

  head() {
    return this.#head;
  }

  tail() {
    return this.#tail;
  }

  at(index) {
    if (index < 0 || index > this.#size - 1) {
      throw new Error(
        `Index out of bounds for linkedList of size: ${this.#size}`
      );
    }
    let count = 0;
    let temp = this.#head;
    while (temp !== null) {
      if (count === index) {
        return temp;
      }
      count++;
      temp = temp.nextNode;
    }
    return -1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Can't pop an empty LinkedList");
    }
    if (this.#head === this.#tail) {
      let removed = this.#head.value;
      this.#head = null;
      this.#tail = null;
      this.#size--;
      return removed;
    }
    let temp = this.#head;
    while (temp.nextNode !== this.#tail) {
      temp = temp.nextNode;
    }
    const removed = this.#tail.value;
    this.#tail = temp;
    this.#tail.nextNode = null;
    this.#size--;
    return removed;
  }

  contains(value) {
    if (this.isEmpty()) {
      return false;
    }
    let temp = this.#head;
    while (temp !== null) {
      if (temp.value === value) {
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }

  find(value) {
    if (this.isEmpty()) {
      return null;
    }
    let count = 0;
    let temp = this.#head;
    while (temp !== null) {
      if (temp.value === value) {
        return count;
      }
      count++;
      temp = temp.nextNode;
    }
    return null;
  }

  toString() {
    let prettyPrint = '';
    let temp = this.#head;
    while (temp !== null) {
      prettyPrint += `( ${temp.value} ) -> `;
      temp = temp.nextNode;
    }
    return prettyPrint + 'null';
  }
}
