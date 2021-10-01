/**
 * @author afu
 * @license MIT
 */

/**
 * 中间件
 */
class Hook {

    /**
     * 中间件
     */
    static _handlers: any[] = [];

    /**
     * 注册中间件
     *
     * @param {any} handler 中间件
     */
    static addHook(handler: any): void {
        Hook._handlers.push(handler);
    }

    private index: number;
    private req: any;
    private res: any;
    private callback: any;

    constructor() {
        this.index = 0;

        this.req = null;
        this.res = null;
        this.callback = null;
    }

    /**
     * 执行中间件
     *
     * @param {any} req
     * @param {any} res
     * @param {any} callback
     */
    public trigger(req: any, res: any, callback: any): void {
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

    /**
     * 获取一个 handler
     */
    private getHook(): any {
        if(this.index === Hook._handlers.length) {
            this.index = 0;

            return null;
        }

        let ret = Hook._handlers[this.index];
        this.index++;

        return ret;
    }

    private triggerHook(next: any): void {
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

export = Hook;
