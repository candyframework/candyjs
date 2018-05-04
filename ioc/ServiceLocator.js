/**
 * @author
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 服务定位器 [service locator](//en.wikipedia.org/wiki/Service_locator_pattern)
 *
 * ```
 * eg.
 * var serviceLocator = new ServiceLocator();
 * serviceLocator.setServicesAsDefinition({
 *     service1: {
 *         "class": "somePath/Service1",
 *         "property1": "value1",
 *         "property2": "value2"
 *     },
 *     service2: {
 *         "class": "somePath/Service2"
 *     }
 * });
 *
 * var instanceService1 = serviceLocator.getService('service1');
 * ```
 */
class ServiceLocator {

    /**
     * constructor
     */
    constructor() {
        /**
         * @property {Map<String, Object>} services
         */
        this.services = new Map();

        /**
         * @property {Map<String, JSON>} definitions
         */
        this.definitions = new Map();
    }

    /**
     * 设置服务
     *
     * @param {String} key
     * @param {Object} service
     */
    setService(key, service) {
        if(null === service) {
            this.services.delete(key);

            return;
        }

        this.services.set(key, service);
    }

    /**
     * 以定义方式设置服务
     *
     * @param {Object} definition
     *
     * {
     *     'service1': {...},
     *     'service2': {...}
     * }
     *
     */
    setServicesAsDefinition(definition) {
        for(let key in definition) {
            if(null === definition[key]) {
                this.definitions.delete(key);

                continue;
            }

            if(undefined === definition[key]['class']) {
                throw new InvalidConfigException('The service configuration must contain a "class" key');
            }

            this.definitions.set(key, definition[key]);
        }
    }

    /**
     * 检查服务是否存在
     *
     * @param {String} key
     * @return {Boolean}
     */
    hasService(key) {
        return this.services.has(key) || this.definitions.has(key);
    }

    /**
     * 获取服务
     *
     * @param {String} key
     * @return {Object | null}
     */
    getService(key) {
        if(this.services.has(key)) {
            return this.services.get(key);
        }

        if(this.definitions.has(key)) {
            return Candy.createObject(this.definitions.get(key));
        }

        return null;
    }

}

module.exports = ServiceLocator;
