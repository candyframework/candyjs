/**
 * @author
 * @license MIT
 */
'use strict';

const StringHelper = require('../helpers/StringHelper');

class Router {

    /**
     * 解析正则路由
     *
     * @param {String} pattern 路由模式
     *
     * pattern: /abc/{id:\d+} -> /abc/(id:\d+) -> /abc/(\d+) -> abc\/(\d+)
     * pattern: /abc/{id:} -> /abc/(id:) -> /abc/() -> abc\/(\w+)
     * pattern: /abc/{\w+} -> /abc/(\w+) -> abc\/(\w+)
     * pattern: /abc/def -> abc\/def
     *
     * @return {Object}
     */
    static parse(pattern) {
        let ret = null;

        // format
        pattern = pattern.replace(/\{/g, '(').replace(/\}/g, ')');
        // search params
        let matches = pattern.match(/\(\w+:/g);
        // replace params
        if(null !== matches) {
            // https://v8project.blogspot.com/2017/09/elements-kinds-in-v8.html
            // ret = new Array(matches.length);
            ret = [];

            for(let i=0,len=matches.length; i<len; i++) {
                pattern = pattern.replace(matches[i], '(');
                pattern = pattern.replace('()', '(\\w+)');

                // ret[i] = matches[i].substring(1, matches[i].indexOf(':'));
                ret.push( matches[i].substring(1, matches[i].indexOf(':')) );
            }
        }

        pattern = StringHelper.trimChar(pattern, '/');
        pattern = pattern.replace(/\//g, '\\/');

        return {
            pattern: pattern,
            params: ret
        };
    }

}

module.exports = Router;
