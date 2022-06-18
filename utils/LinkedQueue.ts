import IQueue from './IQueue';

import LinkedList = require('./LinkedList');

/**
 * 队列
 */
class LinkedQueue<T> extends LinkedList<T> implements IQueue<T> {

    public take(): T {
        return this.removeAt(0);
    }

}

export = LinkedQueue;
