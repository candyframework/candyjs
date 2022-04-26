"use strict";
/**
 * 缓存抽象层
 */
class AbstractCache {
    constructor(application) {
        this.application = application;
    }
    /**
     * 进行初始化
     */
    init() { }
}
module.exports = AbstractCache;
