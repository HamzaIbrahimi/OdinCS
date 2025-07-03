class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

export default class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.head === null;
  }

  length() {
    return this.size;
  }

  enqueue(value) {
    let oldTail = this.tail;
    this.tail = new Node(value);
    if (this.isEmpty()) {
      this.head = this.tail;
    } else {
      oldTail.next = this.tail;
    }
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Cant dequeue an empty Linked List');
    }
    let currentHead = this.head;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.size--;
    return currentHead;
  }

  toString() {
    let prettyPrint = '';
    let temp = this.head;
    while (temp !== null) {
      prettyPrint += `( ${temp.data} ) -> `;
      temp = temp.next;
    }
    return prettyPrint + 'null';
  }
}
