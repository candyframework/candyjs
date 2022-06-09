"use strict";
const Candy = require("../Candy");
const Event = require("./Event");
const Behavior = require("./Behavior");
class Component extends Event {
    constructor() {
        super();
        this.behaviorsMap = new Map();
        this.ensureDeclaredBehaviorsAttached();
    }
    className() {
        return this.constructor.name;
    }
    behaviors() {
        return null;
    }
    attachBehavior(name, behavior) {
        this.attachBehaviorInternal(name, behavior);
    }
    attachBehaviors(behaviors) {
        for (let v of behaviors) {
            this.attachBehavior(v[0], v[1]);
        }
    }
    detachBehavior(name) {
        if (!this.behaviorsMap.has(name)) {
            return null;
        }
        let behavior = this.behaviorsMap.get(name);
        this.behaviorsMap.delete(name);
        behavior.unListen();
        return behavior;
    }
    detachBehaviors() {
        for (let name of this.behaviorsMap.keys()) {
            this.detachBehavior(name);
        }
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
}
module.exports = Component;
