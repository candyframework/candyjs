import IEvent from "./IEvent";

export default interface IComponent extends IEvent {
    /**
     * 获取类名称
     *
     * @return {String}
     */
    className(): string;

    /**
     * 声明组件的行为列表
     *
     * ```
     * [
     *      ['behaviorName', instanceClass],
     *      ['behaviorName', 'behaviorClassPath'],
     *      ['behaviorName', {'classPath': 'behaviorClassPath'}]
     * ]
     * ```
     *
     * @return {any[]} 行为列表
     */
    behaviors(): any[];

    /**
     * 向组件附加一个行为
     *
     * @param {String} name 行为名称
     * @param {any} behavior 行为
     */
    attachBehavior(name: string, behavior: any): void;

     /**
     * 以列表形式向组件添加行为
     *
     * @param {any[]} behaviors 行为列表
     */
    attachBehaviors(behaviors: any[]): void;

    /**
     * 删除组件的行为
     *
     * @param {String} name 行为的名称
     * @return {Behavior | null} 被删除的行为
     */
    detachBehavior(name: string): any;

    /**
     * 删除组件上所有的行为
     */
    detachBehaviors(): void;
}
