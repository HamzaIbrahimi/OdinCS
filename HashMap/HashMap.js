import LinkedList from './LinkedList.js';
class HashMap {
  #buckets;
  #capacity;
  #loadFactor;
  constructor() {
    this.#buckets = [];
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

  set(key, value) {
    let index = this.#hash(key);
    this.#buckets[index] = new LinkedList();
    this.#buckets[index].push(key, value);
  }

  bucket() {
    return this.#buckets;
  }
}

const hashMap = new HashMap();
hashMap.set('Denmark', 'Sweden');
hashMap.set('Denmark', 'Copenhagen');
hashMap.set('Sweden', 'Stockholm');
hashMap.set('Finland', 'Helsinki');
hashMap.set('Norway', 'Oslo');
hashMap.set('Iceland', 'Reykjavik');
hashMap.set('France', 'Paris');
hashMap.set('Germany', 'Munich');

for (let i = 0; i < hashMap.bucket().length; i++) {
  if (hashMap.bucket()[i]) {
    console.log(hashMap.bucket()[i].toString());
  }
}
