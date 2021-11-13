"use strict";
const LinkedList = require("./LinkedList");
/**
 * 队列
 */
class LinkedQueue extends LinkedList {
    size() {
        return super.size();
    }
    add(item) {
        super.add(item);
    }
    take() {
        return this.removeAt(0);
    }
    remove(item) {
        return super.remove(item);
    }
    clear() {
        super.clear();
    }
}
module.exports = LinkedQueue;
