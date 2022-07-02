/**
 * @author afu
 * @license MIT
 */
import Candy = require('../Candy');
import InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 服务定位器 [service locator](//en.wikipedia.org/wiki/Service_locator_pattern)
 *
 * ```
 * eg.
 * const serviceLocator = new ServiceLocator();
 * serviceLocator.setServicesAsDefinition({
 *     service1: {
 *         "classPath": "somePath/Service1",
 *         "property1": "value1",
 *         "property2": "value2"
 *     },
 *     service2: {
 *         "classPath": "somePath/Service2"
 *     }
 * });
 *
 * const instanceService1 = serviceLocator.getService('service1');
 * ```
 */
class ServiceLocator {

    /**
     * service 缓存
     */
    public services: Map<string, any> = new Map();

    /**
     * 服务配置
     */
    public definitions: Map<string, any> = new Map();

    /**
     * 设置服务
     *
     * @param {String} key
     * @param {any} service
     */
    public setService(key: string, service: any): void {
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
    public setServicesAsDefinition(definition: any): void {
        for(let key in definition) {
            if(null === definition[key]) {
                this.definitions.delete(key);

                continue;
            }

            if(undefined === definition[key].classPath) {
                throw new InvalidConfigException('The "classPath" configuration of the service is missing');
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
    public hasService(key: string): boolean {
        return this.services.has(key) || this.definitions.has(key);
    }

    /**
     * 获取服务
     *
     * @param {String} key
     * @return {any}
     */
    public getService(key: string): any {
        if(this.services.has(key)) {
            return this.services.get(key);
        }

        if(this.definitions.has(key)) {
            this.services.set(key, Candy.createObject(this.definitions.get(key)));
            return this.services.get(key);
        }

        return null;
    }

    /**
     * 清空服务
     */
    public clear(): void {
        this.services.clear();
        this.definitions.clear();
    }

}

export = ServiceLocator;
