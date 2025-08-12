class Node {
    constructor() {
        this.value = null;
        this.nextNode = null;
    }
}

export default class Queue {
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
