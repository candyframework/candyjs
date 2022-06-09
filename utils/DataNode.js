"use strict";
class DataNode {
    constructor(data, next = null, previous = null) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }
}
module.exports = DataNode;
