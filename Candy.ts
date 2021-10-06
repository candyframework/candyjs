/**
 * @author afu
 * @license MIT
 */

/**
 * 辅助类
 */
class Candy {

    /**
     * 应用实例
     *
     * @typedef {import('./core/Application')} Application
     * @type {Application}
     * @property {Application} app 当前应用
     */
    static app: any = null;

    /**
     * @property {Map<String, String>} pathAliases 路径别名
     */
    static pathAliases: Map<string, string> = new Map([ ['@candy', __dirname] ]);

    /**
     * @property {String} defaultExtension 默认文件扩展名
     */
    static defaultExtension: string = '.js';

    /**
     * 别名路径转换真实路径
     *
     * @param {String} alias 路径别名
     * @return {String} 路径
     */
    static getPathAlias(alias: string): string {
        if('@' !== alias.charAt(0)) {
            return alias;
        }

        // 截取开头作为别名
        let pos = alias.indexOf('/');
        let root = -1 === pos ? alias : alias.substring(0, pos);
        if(Candy.pathAliases.has(root)) {
            return -1 === pos
                ? Candy.pathAliases.get(root)
                : Candy.pathAliases.get(root) + alias.substring(pos);
        }

        return '';
    }

    /**
     * 设置路径别名
     *
     * @param {String} alias 路径别名
     * @param {String} path 路径
     */
    static setPathAlias(alias: string, path: string): void {
        if('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }

        if('/' === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }

        Candy.pathAliases.set(alias, path);
    }

    /**
     * 删除路径别名
     *
     * @param {String} alias 路径别名
     */
    static deletePathAlias(alias: string): void {
        if('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }

        Candy.pathAliases.delete(alias);
    }

    /**
     * 创建对象
     *
     * @param {any} clazz 以某个别名开头的类全名或类配置
     * @param {any} parameters 构造函数参数
     * @return {any} 类实例
     */
    static createObject(clazz: any, ...parameters: any[]): any {
        if('string' === typeof clazz) {
            return Candy.createObjectAsString(clazz, ...parameters);
        }

        return Candy.createObjectAsDefinition(clazz, ...parameters);
    }

    /**
     * 字符串方式创建对象
     *
     * @param {String} classPath 类路径
     * @param {any} parameters 构造函数参数
     */
    static createObjectAsString(classPath: string, ...parameters: any[]): any {
        let realClass = Candy.getPathAlias('@' + classPath);

        let ClassName = require(realClass + Candy.defaultExtension);

        return new ClassName(...parameters);
    }

    /**
     * 配置方式创建对象
     *
     * @param {any} definition 类配置
     * @param {any} parameters 构造函数参数
     */
    static createObjectAsDefinition(definition: any, ...parameters: any[]): any {
        let realClass = Candy.getPathAlias('@' + definition.classPath);
        let properties = Candy.config({}, definition);

        let ClassName = require(realClass + Candy.defaultExtension);
        let instance = new ClassName(...parameters);

        delete properties.classPath;
        Candy.config(instance, properties);

        return instance;
    }

    /**
     * 导入一个类文件
     *
     * @param {String} clazz 类全名
     */
    static include(clazz: string): any {
        let realClass = Candy.getPathAlias('@' + clazz);

        // 文件不存在抛出异常
        // todo

        return require(realClass + Candy.defaultExtension);
    }

    /**
     * 对象配置
     *
     * @param {any} object 需要配置的对象
     * @param {any} properties 配置项
     * @return {Object} 源对象
     */
    static config(object: any, properties: any): any {
        for(let key in properties) {
            object[key] = properties[key];
        }

        return object;
    }

}

export = Candy;
