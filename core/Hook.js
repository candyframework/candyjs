/**
 * @author
 * @license MIT
 */
'use strict';

/**
 * 中间件
 */
class Hook {

    /**
     * constructor
     */
    constructor() {
        this.index = 0;

        this.req = null;
        this.res = null;
        this.callback = null;
    }

    /**
     * 获取一个 handler
     */
    getHook() {
        if(this.index === Hook._handlers.length) {
            this.index = 0;

            return null;
        }

        let ret = Hook._handlers[this.index];
        this.index++;

        return ret;
    }

    /**
     * 触发
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} callback
     */
    trigger(req, res, callback) {
        this.req = req;
        this.res = res;
        this.callback = callback;

        let first = this.getHook();
        // 没有插件
        if(null === first || 'function' !== typeof first) {
            callback(req, res);
            return;
        }

        this.triggerHook(first);
    }

    triggerHook(next) {
        next(this.req, this.res, () => {
            let nextHandler = this.getHook();

            if(null !== nextHandler && 'function' === typeof nextHandler) {
                this.triggerHook(nextHandler);
                return;
            }

            this.callback(this.req, this.res);
        });
    }

}

/**
 * 中间件
 */
Hook._handlers = [];

/**
 * 注册中间件
 *
 * @param {Function} handler
 */
Hook.addHook = (handler) => {
    Hook._handlers.push(handler);
};

module.exports = Hook;
