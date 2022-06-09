"use strict";
class Hook {
    constructor() {
        this.index = 0;
        this.req = null;
        this.res = null;
        this.callback = null;
    }
    static addHook(handler) {
        Hook._handlers.push(handler);
    }
    trigger(req, res, callback) {
        this.req = req;
        this.res = res;
        this.callback = callback;
        let first = this.getHook();
        if (null === first || 'function' !== typeof first) {
            callback(req, res);
            return;
        }
        this.triggerHook(first);
    }
    getHook() {
        if (this.index === Hook._handlers.length) {
            this.index = 0;
            return null;
        }
        let ret = Hook._handlers[this.index];
        this.index++;
        return ret;
    }
    triggerHook(next) {
        next(this.req, this.res, () => {
            let nextHandler = this.getHook();
            if (null !== nextHandler && 'function' === typeof nextHandler) {
                this.triggerHook(nextHandler);
                return;
            }
            this.callback(this.req, this.res);
        });
    }
}
Hook._handlers = [];
module.exports = Hook;
