/**
 * @author afu
 * @license MIT
 */
import IEvent from './IEvent';

import LinkedList = require('../utils/LinkedList');

/**
 * 简单 Event
 */
class Event implements IEvent {

    public eventsMap: Map<string, LinkedList<any>> = new Map();

    constructor() {}

    /**
     * @inheritdoc
     */
    public on(eventName: string, handler: any): void {
        if(!this.eventsMap.has(eventName)) {
            this.eventsMap.set(eventName, new LinkedList());
        }

        this.eventsMap.get(eventName).add(handler);
    }

    /**
     * @inheritdoc
     */
    public off(eventName: string, handler: any = null): void {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        if(null === handler) {
            this.eventsMap.delete(eventName);
            return;
        }

        let list = this.eventsMap.get(eventName);
        list.remove(handler);
    }

    /**
     * @inheritdoc
     */
    public offAll(): void {
        this.eventsMap.clear();
    }

    /**
     * @inheritdoc
     */
    public trigger(eventName: string, parameter: any = null): void {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        let handlers = this.eventsMap.get(eventName);

        for(let h of handlers) {
            h(parameter);
        }
    }

}

export = Event;
