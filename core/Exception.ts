/**
 * @author afu
 * @license MIT
 */

/**
 * 异常
 */
class Exception extends Error {

    constructor(message: string) {
        super(message);

        this.name = this.constructor.name;
    }

    /**
     * 获得错误名
     *
     * @return {String} 异常类名称
     */
    public getName(): string {
        return this.name;
    }

}

export = Exception;
