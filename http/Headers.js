"use strict";
class Headers {
    constructor() {
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
    get(name, defaultValue = undefined) {
        name = name.toLowerCase();
        if (this.headers.has(name)) {
            return this.headers.get(name).join(', ');
        }
        return defaultValue;
    }
    set(name, value) {
        name = name.toLowerCase();
        this.headers.set(name, [value]);
    }
    add(name, value) {
        name = name.toLowerCase();
        if (this.headers.has(name)) {
            this.headers.get(name).push(value);
            return;
        }
        this.headers.set(name, [value]);
    }
    has(name) {
        return this.headers.has(name);
    }
    remove(name) {
        name = name.toLowerCase();
        return this.headers.delete(name);
    }
    clear() {
        this.headers.clear();
    }
}
module.exports = Headers;
