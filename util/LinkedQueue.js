/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Queue = require('./Queue');

/**
 * 链表
 */
class LinkedQueue extends Queue {

    /**
     * constructor
     */
    constructor() {
        super();

        this.headNode = null;
        this.tailNode = null;
        this.size = 0;

        this.currentIteratorNode = null;
    }

    /**
     * @inheritdoc
     */
    iterator() {
        if(null === this.currentIteratorNode) {
            this.currentIteratorNode = this.headNode;

        } else {
            this.currentIteratorNode = this.currentIteratorNode.next;
        }

        return null === this.currentIteratorNode
            ? (this.currentIteratorNode = null, null)
            : this.currentIteratorNode.data;
    }

    /**
     * @inheritdoc
     */
    each(callback) {
        for(let current = this.headNode; null !== current; current = current.next) {
            if(false === callback(current.data)) {
                break;
            }
        }
    }

    /**
     * @inheritdoc
     */
    add(data) {
        var node = new LinkedQueue.Node(data, null);

        if(0 === this.size) {
            this.headNode = node;

        } else {
            this.tailNode.next = node;
        }

        this.tailNode = node;

        this.size++;
    }

    /**
     * @inheritdoc
     */
    take() {
        // 为空直接返回
        if(0 === this.size) {
            return null;
        }

        var data = this.headNode.data;
        var tmpHeadNode = this.headNode;

        // 从队列去除头节点
        this.headNode = tmpHeadNode.next;
        tmpHeadNode.next = null;
        tmpHeadNode = null;

        // 没节点了
        if(null === this.headNode) {
            this.headNode = this.tailNode = null;
        }

        this.size--;

        return data;
    }

    /**
     * @inheritdoc
     */
    remove(data) {
        var current = this.headNode;
        var previous = null;

        for(; null !== current; previous = current, current = current.next) {
            if(data !== current.data) {
                continue;
            }

            // 删除头结点
            if(null === previous) {
                this.headNode = current.next;
            }

            // 非头结点需要移动 previous
            if(null !== previous) {
                previous.next = current.next;
            }

            // 尾节点
            if(null === current.next) {
                this.tailNode = previous;
            }

            // 清除当前节点
            current.next = null;
            current = null;

            this.size--;

            break;
        }
    }

    /**
     * @inheritdoc
     */
    clear() {
        while(0 !== this.size) {
            this.take();
        }
    }

    /**
     * @inheritdoc
     */
    toString() {
        var str = '[ ';

        for(let current = this.headNode; null !== current; current = current.next) {
            str += current.data + ' ';
        }

        return str + ' ]';
    }

}
LinkedQueue.Node = class {

    /**
     * constructor
     */
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }

};

module.exports = LinkedQueue;
