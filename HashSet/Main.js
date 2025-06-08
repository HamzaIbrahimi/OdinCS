import HashSet from './HashSet.js';

let test = new HashSet();
test.add('apple');
test.add('banana');
test.add('carrot');
test.add('dog');
test.add('elephant');
test.add('frog');
test.add('grape');
test.add('hat');
test.add('ice cream');
test.add('jacket');
test.add('kite');
test.add('lion');
console.log(test.size());
test.remove('kite');
console.log(test.values());
console.log(test.size());
