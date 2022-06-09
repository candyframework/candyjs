"use strict";
class Candy {
    static getPathAlias(alias) {
        if ('@' !== alias.charAt(0)) {
            return alias;
        }
        let pos = alias.indexOf('/');
        let root = -1 === pos ? alias : alias.substring(0, pos);
        if (Candy.pathAliases.has(root)) {
            return -1 === pos
                ? Candy.pathAliases.get(root)
                : Candy.pathAliases.get(root) + alias.substring(pos);
        }
        return '';
    }
    static setPathAlias(alias, path) {
        if ('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }
        if ('/' === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }
        Candy.pathAliases.set(alias, path);
    }
    static deletePathAlias(alias) {
        if ('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }
        Candy.pathAliases.delete(alias);
    }
    static createObject(clazz, ...parameters) {
        if ('string' === typeof clazz) {
            return Candy.createObjectAsString(clazz, ...parameters);
        }
        return Candy.createObjectAsDefinition(clazz, ...parameters);
    }
    static createObjectAsString(classPath, ...parameters) {
        let ClassName = Candy.include(classPath, true);
        return new ClassName(...parameters);
    }
    static createObjectAsDefinition(definition, ...parameters) {
        let properties = Candy.configure({}, definition);
        let ClassName = Candy.include(definition.classPath, true);
        let instance = new ClassName(...parameters);
        delete properties.classPath;
        Candy.configure(instance, properties);
        return instance;
    }
    static include(clazz, isAlias = true) {
        let realClass = isAlias ? Candy.getPathAlias('@' + clazz) : clazz;
        return require(realClass + Candy.defaultExtension);
    }
    static configure(object, properties) {
        for (let key in properties) {
            object[key] = properties[key];
        }
        return object;
    }
}
Candy.app = null;
Candy.pathAliases = new Map([['@candy', __dirname]]);
Candy.defaultExtension = '.js';
module.exports = Candy;
