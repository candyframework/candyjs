/**
 * @author afu
 * @license MIT
 */
import IComponent from './IComponent';

import Candy = require('../Candy');
import Event = require('./Event');
import Behavior = require('./Behavior');

/**
 * 组件是实现 行为 (behavior) 事件 (event) 的基类
 */
class Component extends Event implements IComponent {

    /**
     * the attached behaviors
     *
     * {
     *     'behaviorName1': instance1,
     *     'behaviorNameN': instanceN
     * }
     */
    public behaviorsMap: Map<string, Behavior> = new Map();

    constructor() {
        super();

        this.ensureDeclaredBehaviorsAttached();
    }

    /**
     * 获取类名称
     *
     * @return {String}
     */
    public className(): string {
        return this.constructor.name;
    }

    /**
     * 声明组件的行为列表
     *
     * [
     *      ['behaviorName', instanceClass],
     *      ['behaviorName', 'behaviorClassPath'],
     *      ['behaviorName', {'classPath': 'behaviorClassPath'}]
     * ]
     *
     * @return {any[]} 行为列表
     */
    public behaviors(): any[] {
        return null;
    }

    /**
     * 向组件附加一个行为
     *
     * @param {String} name 行为名称
     * @param {any} behavior 行为
     */
    public attachBehavior(name: string, behavior: any): void {
        this.attachBehaviorInternal(name, behavior);
    }

    /**
     * 以列表形式向组件添加行为
     *
     * @param {any[]} behaviors 行为列表
     */
    public attachBehaviors(behaviors: any[]): void {
        for(let v of behaviors) {
            this.attachBehavior(v[0], v[1]);
        }
    }

    /**
     * 删除组件的行为
     *
     * @param {String} name 行为的名称
     * @return {Behavior | null} 被删除的行为
     */
    public detachBehavior(name: string): Behavior | null {
        if(!this.behaviorsMap.has(name)) {
            return null;
        }

        let behavior = this.behaviorsMap.get(name);

        this.behaviorsMap.delete(name);
        behavior.unListen();

        return behavior;
    }

    /**
     * 删除组件上所有的行为
     */
    public detachBehaviors(): void {
        for(let name of this.behaviorsMap.keys()) {
            this.detachBehavior(name);
        }
    }

    /**
     * 确保 behaviors() 声明的行为已保存到组件
     */
    private ensureDeclaredBehaviorsAttached(): void {
        let behaviors = this.behaviors();

        if(null === behaviors) {
            return;
        }

        for(let v of behaviors) {
            this.attachBehaviorInternal(v[0], v[1]);
        }
    }

    /**
     * 保存行为类到组件
     *
     * @param {String} name 行为的名称
     * @param {any} behavior 行为配置
     */
    private attachBehaviorInternal(name: string, behavior: any): void {
        if(!(behavior instanceof Behavior)) {
            behavior = Candy.createObject(behavior);
        }

        if(this.behaviorsMap.has(name)) {
            this.behaviorsMap.get(name).unListen();
        }

        // 行为类可以监听组件的事件并处理
        behavior.listen(this);
        this.behaviorsMap.set(name, behavior);
    }

}

export = Component;
