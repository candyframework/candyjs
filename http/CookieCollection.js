"use strict";
class CookieCollection {
    constructor() {
        this.cookies = new Map();
    }
    [Symbol.iterator]() {
        let index = 0;
        let keysIterator = this.cookies.keys();
        return {
            next: () => {
                if (index++ < this.cookies.size) {
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
    get(name, defaultValue = undefined) {
        name = name.toLowerCase();
        if (this.cookies.has(name)) {
            return this.cookies.get(name);
        }
        return defaultValue;
    }
    set(name, value) {
        name = name.toLowerCase();
        this.cookies.set(name, value);
    }
    has(name) {
        name = name.toLowerCase();
        return this.cookies.has(name);
    }
    remove(name) {
        name = name.toLowerCase();
        return this.cookies.delete(name);
    }
    clear() {
        this.cookies.clear();
    }
}
module.exports = CookieCollection;
