"use strict";
const ArrayList = require("./ArrayList");
module.exports = class Stack extends ArrayList {
    /**
     * Push an item onto the top of this stack
     *
     * @param {any} item
     */
    push(item) {
        this.add(item);
    }
    /**
     * Removes the object at the top of this stack and returns it
     *
     * @throws {Error}
     */
    pop() {
        let len = this.size();
        let item = this.get(len - 1);
        this.removeAt(len - 1);
        return item;
    }
    /**
     * Tests if this stack is empty
     */
    empty() {
        return 0 === this.size();
    }
};
