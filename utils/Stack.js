"use strict";
const ArrayList = require("./ArrayList");
class Stack extends ArrayList {
    push(item) {
        this.add(item);
    }
    pop() {
        let len = this.size();
        return this.removeAt(len - 1);
    }
    empty() {
        return 0 === this.size();
    }
}
module.exports = Stack;
