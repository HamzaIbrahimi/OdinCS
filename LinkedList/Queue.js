import Node from './LinkedList.js';

class Queue {
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

  enqueue(value) {
    const oldTail = this.#tail;
    this.#tail = new Node();
    this.#tail.value = value;
    this.#tail.nextNode = null;
    if (this.isEmpty()) {
      this.#head = this.#tail;
    } else {
      oldTail.nextNode = this.#tail;
    }
    this.#size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Can't dequeue an empty Queue");
    }
    const currentHead = this.#head.value;
    this.#head = this.#head.nextNode;
    this.#size--;
    return currentHead;
  }

  peek() {
    return this.#head.value;
  }

  size() {
    return this.#size;
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

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
queue.enqueue(6);
console.log(queue.size());
console.log(queue.toString());
console.log(queue.dequeue());
console.log(queue.toString());
