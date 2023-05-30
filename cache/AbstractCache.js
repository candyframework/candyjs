"use strict";
class AbstractCache {
    constructor(application) {
        this.directoryMode = 0o777;
        this.application = application;
    }
    init() { }
}
module.exports = AbstractCache;
