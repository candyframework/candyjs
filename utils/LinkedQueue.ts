import IQueue from './IQueue';

import LinkedList = require('./LinkedList');

/**
 * 队列
 */
class LinkedQueue extends LinkedList implements IQueue {

    public take(): any {
        return this.removeAt(0);
    }

}

export = LinkedQueue;
