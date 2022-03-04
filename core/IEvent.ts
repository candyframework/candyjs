import LinkedList = require('../utils/LinkedList');

export default interface IEvent {
    /**
     * the attached event handlers
     *
     * ```
     * {
     *      'eventName1': [fn1, fn2],
     *      'eventName2': [fn1, fn2]
     * }
     * ```
     *
     */
    eventsMap: Map<string, LinkedList>;

    /**
     * 注册事件处理
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 事件处理器
     */
    on(eventName: string, handler: any): void;

    /**
     * 注销事件
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 事件处理器
     */
    off(eventName: string, handler: any): void;

    /**
     * 注销所有事件
     */
    offAll(): void;

    /**
     * 触发事件
     *
     * @param {String} eventName 事件名称
     * @param {any} parameter 参数
     */
    trigger(eventName: string, parameter: any): void;
}
