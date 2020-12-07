const Stack = require('../../utils/Stack');

const s = new Stack();

s.push(1);
s.push(2);
s.push(3);
console.log('init stack:', s.toString());

console.log('pop stack:', s.pop(), s.toString());
console.log('pop stack:', s.pop(), s.toString());
