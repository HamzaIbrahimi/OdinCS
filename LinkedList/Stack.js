import Node from './LinkedList.js';

class Stack {
  #head;
  #size;
  constructor() {
    this.#head = null;
    this.#size = 0;
  }

  isEmpty() {
    return this.#head === null;
  }

  push(value) {
    const oldHead = this.#head;
    this.#head = new Node();
    this.#head.value = value;
    this.#head.nextNode = oldHead;
    this.#size++;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Can't pop an empty stack");
    }
    let currentElem = this.#head.value;
    this.#head = this.#head.nextNode;
    this.#size--;
    return currentElem;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
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

let stack = new Stack();

for (let i = 0; i < 15; i++) {
  stack.push(i);
}
console.log(stack.peek());
console.log(stack.toString());
console.log(stack.pop());
console.log(stack.toString());
