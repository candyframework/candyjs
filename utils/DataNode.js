"use strict";
/**
 * Node
 */
class DataNode {
    /**
     * constructor
     */
    constructor(data, next = null, previous = null) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }
}
module.exports = DataNode;
