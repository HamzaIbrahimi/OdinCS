import LinkedList from './LinkedList.js';

export default class HashSet {
  #size;
  #buckets;
  #capacity;
  #loadFactor;

  constructor() {
    this.#size = 0;
    this.#buckets = [];
    this.#capacity = 16;
    this.#loadFactor = 0.75;
  }

  #hash(value) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < value.length; i++) {
      hashCode =
        (primeNumber * hashCode + value.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  #resize() {
    let newArray = [];
    this.#size = 0;
    for (let i = 0; i < this.#capacity; i++) {
      if (this.#buckets[i]) {
        let list = this.#buckets[i];
        list.values().forEach((value) => {
          let index = this.#hash(value);
          if (newArray[index]) {
            let currentSize = newArray[index].size();
            newArray[index].push(value);
            if (newArray[index].size() > currentSize) this.#size++;
          } else {
            newArray[index] = new LinkedList();
            newArray[index].push(value);
            this.#size++;
          }
        });
      }
    }
  }

  #isFull() {
    return this.#size >= this.#loadFactor * this.#capacity;
  }

  add(value) {
    if (this.#isFull()) {
      this.#capacity *= 2;
      this.#resize();
    }
    let index = this.#hash(value);
    if (index < 0 || index >= this.#capacity) {
      throw new Error('Trying to access index out of bounds');
    }
    let list = this.#buckets[index];
    if (list) {
      let currentSize = list.size();
      list.push(value);
      if (list.size() > currentSize) this.#size++;
      return;
    }
    this.#buckets[index] = new LinkedList();
    this.#buckets[index].push(value);
    this.#size++;
  }

  has(value) {
    let index = this.#hash(value);
    if (index < 0 || index >= this.#capacity) {
      throw new Error('Trying to access index out of bounds');
    }
    const list = this.#buckets[index];
    if (list) {
      return list.contains(value);
    }
    return false;
  }

  remove(value) {
    let index = this.#hash(value);
    if (index < 0 || index >= this.#capacity) {
      throw new Error('Trying to access index out of bounds');
    }
    const list = this.#buckets[index];
    if (list && list.contains(value)) {
      this.#size--;
      return list.remove(value);
    }
    return false;
  }

  size() {
    return this.#size;
  }

  values() {
    let allValues = [];
    this.#buckets.forEach((bucket) => {
      if (bucket) {
        allValues.push(bucket.values());
      }
    });
    return allValues.flat();
  }

  clear() {
    this.#buckets = [];
    this.#capacity = 16;
    this.#size = 0;
  }
}
