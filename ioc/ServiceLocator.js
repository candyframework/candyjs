"use strict";
const Candy = require("../Candy");
const InvalidConfigException = require("../core/InvalidConfigException");
class ServiceLocator {
    constructor() {
        this.services = new Map();
        this.definitions = new Map();
    }
    setService(key, service) {
        if (null === service) {
            this.services.delete(key);
            return;
        }
        this.services.set(key, service);
    }
    setServicesAsDefinition(definition) {
        for (let key in definition) {
            if (null === definition[key]) {
                this.definitions.delete(key);
                continue;
            }
            if (undefined === definition[key].classPath) {
                throw new InvalidConfigException('The "classPath" configuration of the service is missing');
            }
            this.definitions.set(key, definition[key]);
        }
    }
    hasService(key) {
        return this.services.has(key) || this.definitions.has(key);
    }
    getService(key) {
        if (this.services.has(key)) {
            return this.services.get(key);
        }
        if (this.definitions.has(key)) {
            this.services.set(key, Candy.createObject(this.definitions.get(key)));
            return this.services.get(key);
        }
        return null;
    }
    clear() {
        this.services.clear();
        this.definitions.clear();
    }
}
module.exports = ServiceLocator;
