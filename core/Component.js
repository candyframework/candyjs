"use strict";
const Candy = require("../Candy");
const Event = require("./Event");
const Behavior = require("./Behavior");
const FilterChain = require("./FilterChain");
class Component extends Event {
    constructor() {
        super();
        this.behaviorsMap = new Map();
        this.filterChain = new FilterChain();
        this.initializeFilterChain();
        this.ensureDeclaredBehaviorsAttached();
    }
    className() {
        return this.constructor.name;
    }
    behaviors() {
        return null;
    }
    filters() {
        return null;
    }
    attachBehavior(name, behavior) {
        this.attachBehaviorInternal(name, behavior);
    }
    detachBehavior(name) {
        if (null === this.behaviorsMap) {
            return;
        }
        if (!this.behaviorsMap.has(name)) {
            return null;
        }
        let behavior = this.behaviorsMap.get(name);
        this.behaviorsMap.delete(name);
        behavior.unListen();
        return behavior;
    }
    ensureDeclaredBehaviorsAttached() {
        let behaviors = this.behaviors();
        if (null === behaviors) {
            return;
        }
        for (let v of behaviors) {
            this.attachBehaviorInternal(v[0], v[1]);
        }
    }
    attachBehaviorInternal(name, behavior) {
        if (!(behavior instanceof Behavior)) {
            behavior = Candy.createObject(behavior);
        }
        if (this.behaviorsMap.has(name)) {
            this.behaviorsMap.get(name).unListen();
        }
        behavior.listen(this);
        this.behaviorsMap.set(name, behavior);
    }
    initializeFilterChain() {
        this.filterChain.setResource(this);
        let filters = this.filters();
        if (null === filters) {
            return;
        }
        for (let filter of filters) {
            if ('string' === typeof filter) {
                filter = Candy.createObject(filter);
            }
            this.filterChain.addFilter(filter);
        }
    }
}
module.exports = Component;
