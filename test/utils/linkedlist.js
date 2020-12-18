const LinkedList = require('../../utils/LinkedList');

const list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);
console.log('fist init list:', list.toString());

list.remove(1);
console.log('remove value 1:', list.toString());

list.removeAt(0);
console.log('remove first value:', list.toString());

list.add(4);
list.add(5);
list.add(6);
console.log('add new value:', list.toString());

list.removeAt(3);
console.log('remove last value:', list.toString());
