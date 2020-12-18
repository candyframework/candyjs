/**
 * @author afu
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const Event = require('./Event');
const Behavior = require('./Behavior');

/**
 * 组件是实现 行为 (behavior) 事件 (event) 的基类
 */
class Component extends Event {

    /**
     * constructor
     */
    constructor() {
        super();

        /**
         * @property {Map<String, Behavior>} behaviorsMap the attached behaviors
         *
         * {
         *     'behaviorName1': instance1,
         *     'behaviorNameN': instanceN
         * }
         */
        this.behaviorsMap = new Map();

        this.ensureDeclaredBehaviorsAttached();
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
     * @return {Array} 行为列表
     */
    behaviors() {
        return null;
    }

    /**
     * 确保 behaviors() 声明的行为已保存到组件
     */
    ensureDeclaredBehaviorsAttached() {
        let behaviors = this.behaviors();

        if(null === behaviors) {
            return;
        }

        for(let v of behaviors) {
            this.attachBehaviorInternal(v[0], v[1]);
        }
    }

    /**
     * 向组件附加一个行为
     *
     * @param {String} name 行为名称
     * @param {String | Object} behavior 行为
     */
    attachBehavior(name, behavior) {
        this.attachBehaviorInternal(name, behavior);
    }

    /**
     * 以列表形式向组件添加行为
     *
     * @param {Array} behaviors 行为列表
     */
    attachBehaviors(behaviors) {
        for(let v of behaviors) {
            this.attachBehavior(v[0], v[1]);
        }
    }

    /**
     * 删除组件的行为
     *
     * @param {String} name 行为的名称
     * @return {Object | null}
     */
    detachBehavior(name) {
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
    detachBehaviors() {
        for(let name of this.behaviorsMap.keys()) {
            this.detachBehavior(name);
        }
    }

    /**
     * 保存行为类到组件
     *
     * @param {String} name 行为的名称
     * @param {Behavior | String | Object} behavior
     */
    attachBehaviorInternal(name, behavior) {
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

module.exports = Component;
