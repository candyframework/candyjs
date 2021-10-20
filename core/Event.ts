/**
 * @author afu
 * @license MIT
 */

/**
 * 简单 Event
 */
class Event {

    /**
     * the attached event handlers
     *
     * {
     *      'eventName1': [fn1, fn2],
     *      'eventName2': [fn1, fn2]
     * }
     */
    public eventsMap: Map<string, any[]> = new Map();

    /**
     * 注册事件处理
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 事件处理器
     */
    public on(eventName: string, handler: any): void {
        if(!this.eventsMap.has(eventName)) {
            this.eventsMap.set(eventName, []);
        }

        this.eventsMap.get(eventName).push(handler);
    }

    /**
     * 注销事件
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 事件处理器
     */
    public off(eventName: string, handler: any = null): void {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        if(null === handler) {
            this.eventsMap.delete(eventName);
            return;
        }

        let handlers = this.eventsMap.get(eventName);
        for(let i=0; i<handlers.length; i++) {
            if(handler === handlers[i]) {
                handlers.splice(i, 1);
            }
        }
    }

    /**
     * 注销所有事件
     */
    public offAll(): void {
        this.eventsMap.clear();
    }

    /**
     * 触发事件
     *
     * @param {String} eventName 事件名称
     * @param {any} parameter 参数
     */
    public trigger(eventName: string, parameter: any = null): void {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        let handlers = this.eventsMap.get(eventName);
        for(let i=0; i<handlers.length; i++) {
            handlers[i](parameter);
        }
    }

}

export = Event;
