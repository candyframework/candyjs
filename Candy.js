/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var StringHelper = require('./helpers/StringHelper');

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
        var pos = alias.indexOf('/');
        var root = -1 === pos ? alias : alias.substring(0, pos);
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
        
        Candy.pathAliases[alias] = StringHelper.rTrimChar(path, '/');
    }
    
    /**
     * 创建对象 系统类路径约定以 y 开头 应用类以项目目录开头
     *
     * @param {String | JSON} clazz 以某个已经定义的别名开头的类全名或带 'class' 键的配置
     *
     * eg.
     * candy/log/file/Target
     * or
     * {class: '...', ...}
     *
     * @param {any} params 构造函数参数
     * @return {Object} 类实例
     */
    static createObject(clazz, ...params) {
        var realClass = '';
        var properties = null;
        
        if('string' === typeof clazz) {
            realClass = Candy.getPathAlias('@' + clazz);
            
        } else if('object' === typeof clazz && undefined !== clazz['class']) {
            realClass = Candy.getPathAlias('@' + clazz['class']);
            
            properties = Candy.config({}, clazz);
            delete properties['class'];
        }
        
        // 文件不存在抛出异常
        // todo
        
        var ClassName = require(realClass + Candy.fileExtention);
        var instance = new ClassName(...params);
        
        if(null !== properties) {
            Candy.config(instance, properties);
        }
        
        return instance;
    }
    
    /**
     * 导入一个类文件
     *
     * @param {String} clazz 类全名
     */
    static include(clazz) {
        var realClass = Candy.getPathAlias('@' + clazz);
        
        // 文件不存在抛出异常
        // todo
        
        return require(realClass + Candy.fileExtention);
    }
    
    /**
     * 对象配置
     *
     * @param {Object} object 需要配置的对象
     * @param {JSON} properties 配置项
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
 * @property {JSON} pathAliases 路径别名
 */
Candy.pathAliases = {'@candy': __dirname};

/**
 * @property {String} fileExtention 默认文件扩展名
 */
Candy.fileExtention = '.js';

module.exports = Candy;
