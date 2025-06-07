import LinkedList from './LinkedList.js';
export default class HashMap {
  #buckets;
  #capacity;
  #loadFactor;
  #occupiedBuckets;
  constructor() {
    this.#buckets = [];
    this.#occupiedBuckets = 0;
    this.#capacity = 16;
    this.#loadFactor = 0.75;
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  #resize() {
    let newArray = [];
    this.#occupiedBuckets = 0;
    for (let i = 0; i < this.#capacity; i++) {
      if (this.#buckets[i]) {
        this.#buckets[i].keyValueArray().forEach(([key, value]) => {
          let index = this.#hash(key);
          if (newArray[index]) {
            newArray[index].push(key, value);
          } else {
            newArray[index] = new LinkedList();
            newArray[index].push(key, value);
            this.#occupiedBuckets++;
          }
        });
      }
    }
    this.#buckets = newArray;
  }

  #isFull() {
    return (
      this.#occupiedBuckets >= Math.ceil(this.#loadFactor * this.#capacity)
    );
  }

  set(key, value) {
    if (this.#isFull()) {
      this.#capacity *= 2;
      this.#resize();
    }
    let index = this.#hash(key);
    if (index < 0 || index >= this.#capacity) {
      throw new Error('Trying to access index out of bounds');
    }
    if (this.#buckets[index]) {
      this.#buckets[index].push(key, value);
      return;
    }
    this.#buckets[index] = new LinkedList();
    this.#buckets[index].push(key, value);
    this.#occupiedBuckets++;
  }

  get(key) {
    let index = this.#hash(key);
    if (index < 0 || index >= this.#capacity) {
      throw new Error('Trying to access index out of bounds');
    }
    if (this.#buckets[index]) {
      return this.#buckets[index].get(key);
    }
    return null;
  }

  has(key) {
    if (this.get(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    let index = this.#hash(key);
    if (this.has(key)) {
      this.#buckets[index].remove(key);
      if (this.#buckets[index].isEmpty()) {
        this.#occupiedBuckets--;
      }
      return true;
    }
    return false;
  }

  length() {
    let len = 0;
    for (let i = 0; i < this.#buckets.length; i++) {
      if (this.#buckets[i]) {
        len += this.#buckets[i].size();
      }
    }
    return len;
  }

  clear() {
    this.#buckets = [];
    this.#capacity = 16;
    this.#occupiedBuckets = 0;
  }

  keys() {
    let allKeys = [];
    this.#buckets.forEach((bucket) => {
      if (bucket) {
        for (let node = bucket.head(); node !== null; node = node.next) {
          allKeys.push(node.key);
        }
      }
    });
    return allKeys;
  }

  values() {
    let allValues = [];
    this.#buckets.forEach((bucket) => {
      if (bucket) {
        for (let node = bucket.head(); node !== null; node = node.next) {
          allValues.push(node.value);
        }
      }
    });
    return allValues;
  }

  entries() {
    let array = [];
    this.#buckets.forEach((bucket) => {
      if (bucket) {
        array.push(bucket.keyValueArray());
      }
    });
    return array.flat();
  }

  capacity() {
    return this.#capacity;
  }
}
