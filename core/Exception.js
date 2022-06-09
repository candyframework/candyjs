"use strict";
class Exception extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
    getName() {
        return this.name;
    }
}
module.exports = Exception;
