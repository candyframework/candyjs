"use strict";
/**
 * @author afu
 * @license MIT
 */
/**
 * 异常
 */
class Exception extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
    /**
     * 获得错误名
     *
     * @return {String} 异常类名称
     */
    getName() {
        return this.name;
    }
}
module.exports = Exception;
