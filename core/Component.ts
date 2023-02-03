/**
 * @author afu
 * @license MIT
 */
import IComponent from './IComponent';

import Candy = require('../Candy');
import Event = require('./Event');
import Behavior = require('./Behavior');
import FilterChain = require('./FilterChain');

/**
 * 组件是实现 过滤器 (filter) 行为 (behavior) 事件 (event) 的基类
 */
class Component extends Event implements IComponent {

    /**
     * the attached behaviors
     */
    public behaviorsMap: Map<string, Behavior> = new Map();

    /**
     * the filter collection
     */
    public filterChain: FilterChain = new FilterChain();

    constructor() {
        super();

        this.initializeFilterChain();
        this.ensureDeclaredBehaviorsAttached();
    }

    /**
     * @inheritdoc
     */
    public className(): string {
        return this.constructor.name;
    }

    /**
     * @inheritdoc
     */
    public behaviors(): any[] {
        return null;
    }

    /**
     * @inheritdoc
     */
    public filters(): any[] {
        return null;
    }

    /**
     * @inheritdoc
     */
    public attachBehavior(name: string, behavior: any): void {
        this.attachBehaviorInternal(name, behavior);
    }

    /**
     * @inheritdoc
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

    /**
     * 初始化过滤链
     */
    private initializeFilterChain(): void {
        this.filterChain.setResource(this);

        let filters = this.filters();
        if(null === filters) {
            return;
        }

        for(let filter of filters) {
            if('string' === typeof filter) {
                filter = Candy.createObject(filter);
            }

            this.filterChain.addFilter(filter);
        }
    }

}

export = Component;
