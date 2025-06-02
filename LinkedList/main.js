import LinkedList from './LinkedList.js';
const list = new LinkedList();

list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');
console.log(list.toString());
list.removeAt(4);
console.log(list.size());
console.log(list.toString());
list.insertAt('eagle', 2);
console.log(list.toString());
console.log(list.size());
list.removeAt(list.size() - 1);
console.log(list.toString());
