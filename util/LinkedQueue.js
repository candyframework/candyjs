/**
 * @author
 * @license MIT
 */
'use strict';

var Queue = require('./Queue');

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
    }
    
    [Symbol.iterator]() {
        return this;
    }
    
    next() {
        if(undefined === this.currentIteratorNode) {
            this.currentIteratorNode = this.headNode;
            
        } else {
            this.currentIteratorNode = this.currentIteratorNode.next;
        }
        
        return null === this.currentIteratorNode ?
            (this.currentIteratorNode = undefined, {done: true}) :
            {done: false, value: this.currentIteratorNode.data};
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
    clear() {
        while(0 !== this.size) {
            this.take();
        }
    }
    
    /**
     * toString
     */
    toString() {
        var str = '[ ';
        
        /*
        for(let current = this.headNode; null !== current; current = current.next) {
            str += current.data + ' ';
        }
        */
        for(let data of this) {
            str = str + data + ' ';
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
