"use strict";
const DataNode = require("./DataNode");
class LinkedList {
    constructor() {
        this.length = 0;
        this.headNode = null;
        this.tailNode = null;
    }
    [Symbol.iterator]() {
        let node = this.headNode;
        return {
            next: () => {
                if (null !== node) {
                    let ret = { value: node.data, done: false };
                    node = node.next;
                    return ret;
                }
                return { value: undefined, done: true };
            }
        };
    }
    linkLast(element) {
        let last = this.tailNode;
        let newNode = new DataNode(element, null, last);
        this.tailNode = newNode;
        if (null === last) {
            this.headNode = newNode;
        }
        else {
            last.next = newNode;
        }
        this.length++;
    }
    linkBefore(element, node) {
        let prev = node.previous;
        let newNode = new DataNode(element, node, prev);
        node.previous = newNode;
        if (null === prev) {
            this.headNode = newNode;
        }
        else {
            prev.next = newNode;
        }
        this.length++;
    }
    unlink(node) {
        let data = node.data;
        let next = node.next;
        let prev = node.previous;
        if (null === prev) {
            this.headNode = next;
        }
        else {
            prev.next = next;
            node.previous = null;
        }
        if (null === next) {
            this.tailNode = prev;
        }
        else {
            next.previous = prev;
            node.next = null;
        }
        node.data = null;
        this.length--;
        return data;
    }
    getNode(index) {
        let node = null;
        if (index < (this.length >> 1)) {
            node = this.headNode;
            for (let i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        }
        node = this.tailNode;
        for (let i = this.length - 1; i > index; i--) {
            node = node.previous;
        }
        return node;
    }
    size() {
        return this.length;
    }
    isEmpty() {
        return 0 === this.length;
    }
    contains(element) {
        return this.indexOf(element) >= 0;
    }
    indexOf(element) {
        let index = 0;
        for (let x = this.headNode; null !== x; x = x.next) {
            if (element === x.data) {
                return index;
            }
            index++;
        }
        return -1;
    }
    lastIndexOf(element) {
        let index = this.length;
        for (let x = this.tailNode; null !== x; x = x.previous) {
            index--;
            if (element === x.data) {
                return index;
            }
        }
        return -1;
    }
    add(element) {
        this.linkLast(element);
    }
    insert(index, element) {
        if (index > this.length) {
            return false;
        }
        if (index === this.length) {
            this.linkLast(element);
        }
        else {
            this.linkBefore(element, this.getNode(index));
        }
        return true;
    }
    remove(element) {
        for (let x = this.headNode; null !== x; x = x.next) {
            if (element === x.data) {
                this.unlink(x);
                return true;
            }
        }
        return false;
    }
    removeAt(index) {
        if (index >= this.length) {
            return null;
        }
        return this.unlink(this.getNode(index));
    }
    get(index) {
        if (index >= this.length) {
            return null;
        }
        return this.getNode(index).data;
    }
    set(index, element) {
        if (index >= this.length) {
            return null;
        }
        let node = this.getNode(index);
        let oldValue = node.data;
        node.data = element;
        return oldValue;
    }
    clear() {
        for (let next = null, x = this.headNode; null !== x;) {
            next = x.next;
            x.data = null;
            x.next = null;
            x.previous = null;
            x = next;
        }
        this.length = 0;
        this.headNode = null;
        this.tailNode = null;
    }
    toString() {
        let ret = '[ ';
        for (let current = this.headNode; null !== current; current = current.next) {
            ret += current.data + ', ';
        }
        ret = ret.substring(0, ret.lastIndexOf(', '));
        return ret + ' ]';
    }
}
module.exports = LinkedList;
