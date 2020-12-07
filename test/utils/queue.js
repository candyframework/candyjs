const Q = require('../../utils/SingleLinkedQueue');

const q = new Q();

q.add(1);
q.add(2);
q.add(3);

console.log('init queue:', q.toString());

console.log('take queue:', q.take(), q.toString());
console.log('take queue:', q.take(), q.toString());

q.add(4);
q.add(5);
console.log('new add queue:', q.toString());

console.log('take queue:', q.take(), q.toString());
