import IQueue from './IQueue';

import LinkedList = require('./LinkedList');

/**
 * 队列
 */
class LinkedQueue extends LinkedList implements IQueue {

    public size(): number {
        return super.size();
    }

    public add(item: any): void {
        super.add(item);
    }

    public take(): any {
        return this.removeAt(0);
    }

    public remove(item: any): boolean {
        return super.remove(item);
    }

    public clear(): void {
        super.clear();
    }

}

export = LinkedQueue;
