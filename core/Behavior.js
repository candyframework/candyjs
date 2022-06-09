"use strict";
class Behavior {
    constructor() {
        this.component = null;
    }
    events() {
        return null;
    }
    listen(component) {
        this.component = component;
        let events = this.events();
        if (null === events) {
            return;
        }
        for (let v of events) {
            this.component.on(v[0], v[1]);
        }
    }
    unListen() {
        if (null === this.component) {
            return;
        }
        let events = this.events();
        if (null === events) {
            return;
        }
        for (let v of events) {
            this.component.off(v[0], v[1]);
        }
        this.component = null;
    }
}
module.exports = Behavior;
