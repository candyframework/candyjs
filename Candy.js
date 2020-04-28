/**
 * @author
 * @license MIT
 */
'use strict';

/**
 * 辅助类
 */
class Candy {

    /**
     * @ 别名路径转换真实路径
     *
     * @param {String} alias 路径别名
     * @return {String} 路径
     */
    static getPathAlias(alias) {
        if('@' !== alias.charAt(0)) {
            return alias;
        }

        // 截取开头作为别名
        let pos = alias.indexOf('/');
        let root = -1 === pos ? alias : alias.substring(0, pos);
        if(undefined !== Candy.pathAliases[root]) {
            return -1 === pos ?
                Candy.pathAliases[root] :
                Candy.pathAliases[root] + alias.substring(pos);
        }

        return '';
    }

    /**
     * 设置路径别名
     *
     * @param {String} alias 路径别名
     * @param {String} path 路径
     */
    static setPathAlias(alias, path) {
        if('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }

        if(null === path) {
            delete Candy.pathAliases[alias];

            return;
        }

        if('/' === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }

        Candy.pathAliases[alias] = path;
    }
    
    /**
     * 删除路径别名
     *
     * @param {String} alias 路径别名
     */
    static deletePathAlias(alias) {
        if('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }
        
        delete Candy.pathAliases[alias];
    }

    /**
     * 创建对象 系统类路径约定以 candy 开头 应用类以项目目录开头
     *
     * @param {String | Object} clazz 以某个已经定义的别名开头的类全名或带 'classPath' 键的配置
     *
     * eg.
     * candy/log/file/Target
     * or
     * {classPath: '...', ...}
     *
     * @param {any} parameters 构造函数参数
     * @return {Object} 类实例
     */
    static createObject(clazz, ...parameters) {
        if('string' === typeof clazz) {
            return Candy.createObjectAsString(clazz, ...parameters);
        }

        return Candy.createObjectAsDefinition(clazz, ...parameters);
    }

    /**
     * 字符串方式创建对象
     *
     * @param {String} classPath
     */
    static createObjectAsString(classPath, ...parameters) {
        let realClass = Candy.getPathAlias('@' + classPath);

        let ClassName = require(realClass + Candy.defaultExtension);

        return new ClassName(...parameters);
    }

    /**
     * 配置方式创建对象
     *
     * @param {Object} definition
     */
    static createObjectAsDefinition(definition, ...parameters) {
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
    static include(clazz) {
        let realClass = Candy.getPathAlias('@' + clazz);

        // 文件不存在抛出异常
        // todo

        return require(realClass + Candy.defaultExtension);
    }

    /**
     * 对象配置
     *
     * @param {Object} object 需要配置的对象
     * @param {Object} properties 配置项
     * @return {Object} 源对象
     */
    static config(object, properties) {
        for(let key in properties) {
            object[key] = properties[key];
        }

        return object;
    }

}

/**
 * @property {Application} app 应用实例
 */
Candy.app = null;

/**
 * @property {Object} pathAliases 路径别名
 */
Candy.pathAliases = {'@candy': __dirname};

/**
 * @property {String} defaultExtension 默认文件扩展名
 */
Candy.defaultExtension = '.js';

module.exports = Candy;
