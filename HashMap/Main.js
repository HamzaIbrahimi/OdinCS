import HashMap from './HashMap.js';

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log(test.length());
console.log(test.capacity());
test.set('moon', 'silver');
console.log(test.capacity());
console.log(test.length());
console.log(test.keys());
test.set('lion', 'black');
console.log(test.get('lion'));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.remove('banana');
test.remove('kite');
test.remove('jacket');
console.log(test.length() === 10);
test.clear();
console.log(test.length() === 0);
console.log(test.capacity() === 16);
console.log(test.get('hat') === null);
