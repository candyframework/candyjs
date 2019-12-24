/**
 * @author
 * @license MIT
 */
'use strict';

class Hook {

    /**
     * constructor
     */
    constructor() {
        this.index = 0;
        this.handlers = [];
        this.callback = null;
    }

    /**
     * 获取 Hook 实例
     */
    static getInstance() {
        if(null === Hook._instance) {
            Hook._instance = new Hook();
        }

        return Hook._instance;
    }

    /**
     * 注册
     *
     * @param {Function} handler
     */
    addHook(handler) {
        this.handlers.push(handler);
    }

    /**
     * 获取一个 handler
     */
    getHook() {
        if(this.index === this.handlers.length) {
            this.index = 0;

            return null;
        }

        let ret = this.handlers[this.index];
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
        let first = this.getHook();

        this.callback = callback;

        // 没有插件
        if(null === first || 'function' !== typeof first) {
            callback(req, res, null);
            return;
        }

        this.triggerHook(req, res, first);
    }

    triggerHook(req, res, next) {
        next(req, res, () => {
            let nextHandler = this.getHook();

            if(null !== nextHandler && 'function' === typeof nextHandler) {
                this.triggerHook(req, res, nextHandler);
                return;
            }

            this.callback(req, res, null);
        });
    }

}

/**
 * instance
 */
Hook._instance = null;

module.exports = Hook;
