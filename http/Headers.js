"use strict";
/**
 * @author afu
 * @license MIT
 */
/**
 * HTTP headers collection
 */
class Headers {
    constructor() {
        /**
         * headers the headers in this collection
         *
         * header 头可能重复出现 所以这里以数组形式保存
         */
        this.headers = new Map();
    }
    [Symbol.iterator]() {
        let index = 0;
        let keysIterator = this.headers.keys();
        return {
            next: () => {
                if (index++ < this.headers.size) {
                    let key = keysIterator.next().value;
                    return {
                        value: [key, this.get(key)],
                        done: false
                    };
                }
                return { value: undefined, done: true };
            }
        };
    }
    /**
     * 获取一条 header
     *
     * @param {String} name the name of the header
     * @param {any} defaultValue
     * @return {String}
     */
    get(name, defaultValue = null) {
        name = name.toLowerCase();
        if (this.headers.has(name)) {
            return this.headers.get(name).join(', ');
        }
        return defaultValue;
    }
    /**
     * 添加一条 header 如果有重名则覆盖
     *
     * @param {String} name the name of the header
     * @param {String} value the value of the header
     */
    set(name, value) {
        name = name.toLowerCase();
        this.headers.set(name, [value]);
    }
    /**
     * 添加一条 header 如果有重名则追加
     *
     * @param {String} name the name of the header
     * @param {String} value the value of the header
     */
    add(name, value) {
        name = name.toLowerCase();
        if (this.headers.has(name)) {
            this.headers.get(name).push(value);
            return;
        }
        this.headers.set(name, [value]);
    }
    /**
     * 是否存在 header
     *
     * @param {String} name the name of the header
     * @return {Boolean}
     */
    has(name) {
        return this.headers.has(name);
    }
    /**
     * 删除一条 header
     *
     * @param {String} name the name of the header
     * @return {Boolean}
     */
    remove(name) {
        name = name.toLowerCase();
        return this.headers.delete(name);
    }
    /**
     * 删除所有 header
     */
    clear() {
        this.headers.clear();
    }
}
module.exports = Headers;
