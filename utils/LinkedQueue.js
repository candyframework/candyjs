"use strict";
const LinkedList = require("./LinkedList");
class LinkedQueue extends LinkedList {
    take() {
        return this.removeAt(0);
    }
}
module.exports = LinkedQueue;
