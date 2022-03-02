"use strict";
const Candy = require("../Candy");
const Event = require("./Event");
const Behavior = require("./Behavior");
/**
 * 组件是实现 行为 (behavior) 事件 (event) 的基类
 */
class Component extends Event {
    constructor() {
        super();
        /**
         * the attached behaviors
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
     * @inheritdoc
     */
    className() {
        return this.constructor.name;
    }
    /**
     * @inheritdoc
     */
    behaviors() {
        return null;
    }
    /**
     * @inheritdoc
     */
    attachBehavior(name, behavior) {
        this.attachBehaviorInternal(name, behavior);
    }
    /**
     * @inheritdoc
     */
    attachBehaviors(behaviors) {
        for (let v of behaviors) {
            this.attachBehavior(v[0], v[1]);
        }
    }
    /**
     * @inheritdoc
     */
    detachBehavior(name) {
        if (!this.behaviorsMap.has(name)) {
            return null;
        }
        let behavior = this.behaviorsMap.get(name);
        this.behaviorsMap.delete(name);
        behavior.unListen();
        return behavior;
    }
    /**
     * @inheritdoc
     */
    detachBehaviors() {
        for (let name of this.behaviorsMap.keys()) {
            this.detachBehavior(name);
        }
    }
    /**
     * 确保 behaviors() 声明的行为已保存到组件
     */
    ensureDeclaredBehaviorsAttached() {
        let behaviors = this.behaviors();
        if (null === behaviors) {
            return;
        }
        for (let v of behaviors) {
            this.attachBehaviorInternal(v[0], v[1]);
        }
    }
    /**
     * 保存行为类到组件
     *
     * @param {String} name 行为的名称
     * @param {any} behavior 行为配置
     */
    attachBehaviorInternal(name, behavior) {
        if (!(behavior instanceof Behavior)) {
            behavior = Candy.createObject(behavior);
        }
        if (this.behaviorsMap.has(name)) {
            this.behaviorsMap.get(name).unListen();
        }
        // 行为类可以监听组件的事件并处理
        behavior.listen(this);
        this.behaviorsMap.set(name, behavior);
    }
}
module.exports = Component;
