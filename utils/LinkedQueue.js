"use strict";
const LinkedList = require("./LinkedList");
/**
 * 队列
 */
class LinkedQueue extends LinkedList {
    take() {
        return this.removeAt(0);
    }
}
module.exports = LinkedQueue;
