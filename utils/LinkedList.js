"use strict";
const DataNode = require("./DataNode");
const IndexOutOfBoundsException = require("../core/IndexOutOfBoundsException");
/**
 * LinkedList
 */
class LinkedList {
    constructor() {
        this.headNode = null;
        this.tailNode = null;
        this.length = 0;
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
    /**
     * Links element as last element
     */
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
    /**
     * Inserts element before node
     */
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
    /**
     * Unlinks node
     */
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
    /**
     * Find node by index
     */
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
    /**
     * Returns the number of elements in this list
     *
     * @returns {Number}
     */
    size() {
        return this.length;
    }
    /**
     * Returns true if this list contains no elements
     *
     * @returns {Boolean}
     */
    isEmpty() {
        return 0 === this.length;
    }
    /**
     * Returns true if this list contains the specified element
     *
     * @param {any} element
     * @returns {Boolean}
     */
    contains(element) {
        return this.indexOf(element) >= 0;
    }
    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {ANY} element
     * @returns {Number}
     */
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
    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {any} element
     * @returns {Number}
     */
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
    /**
     * Appends the specified element to the end of this list
     *
     * @param {any} element
     */
    add(element) {
        this.linkLast(element);
    }
    /**
     * Inserts the specified element at the specified position
     *
     * @param {Number} index
     * @param {any} element
     * @throws {IndexOutOfBoundsException}
     */
    insert(index, element) {
        if (index > this.length) {
            throw new IndexOutOfBoundsException('index=' + index + ', size=' + this.length);
        }
        if (index === this.length) {
            this.linkLast(element);
            return;
        }
        this.linkBefore(element, this.getNode(index));
    }
    /**
     * Removes the first occurrence of the specified element from this list
     *
     * @param {any} element
     */
    remove(element) {
        for (let x = this.headNode; null !== x; x = x.next) {
            if (element === x.data) {
                this.unlink(x);
                return true;
            }
        }
        return false;
    }
    /**
     * Removes the element at the specified position in this list
     *
     * @param {Number} index
     * @throws {IndexOutOfBoundsException}
     */
    removeAt(index) {
        if (index >= this.length) {
            throw new IndexOutOfBoundsException('index=' + index + ', size=' + this.length);
        }
        return this.unlink(this.getNode(index));
    }
    /**
     * Returns the element at the specified position in this list
     *
     * @param {Number} index
     * @throws {IndexOutOfBoundsException}
     */
    get(index) {
        if (index >= this.length) {
            throw new IndexOutOfBoundsException('index=' + index + ', size=' + this.length);
        }
        return this.getNode(index).data;
    }
    /**
     * Replaces the element in the list with the specified element
     *
     * @param {Number} index
     * @param {any} element
     * @throws {IndexOutOfBoundsException}
     */
    set(index, element) {
        if (index >= this.length) {
            throw new IndexOutOfBoundsException('index=' + index + ', size=' + this.length);
        }
        let node = this.getNode(index);
        let oldValue = node.data;
        node.data = element;
        return oldValue;
    }
    /**
     * Removes all of the elements from this list
     */
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
