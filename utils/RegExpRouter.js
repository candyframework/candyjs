/**
 * @author
 * @license MIT
 */
'use strict';

const StringHelper = require('../helpers/StringHelper');

/**
 * 正则路由
 */
class RegExpRouter {

    /**
     * @param {Array} routesMap
     *
     * [
     *      {route: '/home', handler: func1},
     *      {route: '/user/{uid}', handler: func2},
     * ]
     *
     */
    constructor(routesMap) {
        this.routesMap = routesMap;

        /**
         * @property {String} combinedRoutePattern
         */
        this.combinedRoutePattern = '';
        /**
         * @property {Array} combinedRouteParameters
         */
        this.combinedRouteParameters = null;
    }

    /**
     * 合并路由
     *
     * @return {Object}
     *
     * {
     *      pattern: '(?:\\/home\\/?$)|(?:\\/user\\/(\\d+)\\/?$)',
     *      parameters: [ null, ['uid'] ]
     * }
     */
    combineRoutes() {
        let patterns = [];
        let parameters = [];

        for(let regExp=null, i=0, len=this.routesMap.length; i<len; i++) {
            regExp = this.toRegExpRouter(this.routesMap[i].route);

            patterns.push( '(?:' + regExp.pattern + ')' );
            parameters.push(regExp.parameters);
        }

        this.combinedRoutePattern = patterns.join('|');
        this.combinedRouteParameters = parameters;
    }

    /**
     * 解析正则路由
     *
     * @param {String} patternString 路由
     *
     * 由于反斜线的转译影响 元字符需要两个反斜线
     *
     * pattern: /home/{uid}         -> \\/home\\/(\\w+)
     * pattern: /home/{uid}/{page}  -> \\/home\\/(\\w+)\\/(\\w+)
     * pattern: /home/{uid:\\d+}    -> \\/home\\/(\\d+)
     * pattern: /home/profile       -> \\/home\\/profile
     *
     * @return {Object}
     */
    toRegExpRouter(patternString) {
        let parameters = null;

        // format /home/(uid)
        let pattern = patternString.replace(/\{/g, '(').replace(/\}/g, ')');

        // search parameters
        let matchedParams = pattern.match(/\([^:\)]+/g);

        // replace parameters
        if(null !== matchedParams) {
            parameters = [];

            for(let i=0,len=matchedParams.length; i<len; i++) {
                pattern = pattern.replace(matchedParams[i], '(');
                pattern = pattern.replace(':', '');
                pattern = pattern.replace('()', '(\\w+)');

                parameters.push( matchedParams[i].substring(1) );
            }
        }

        pattern = StringHelper.trimChar(pattern, '/');
        pattern = '^\\/' + pattern.replace(/\//g, '\\/') + '\\/?$';

        return {
            pattern: pattern,
            parameters: parameters
        };
    }

    /**
     * 执行路由匹配
     *
     * @param {String} route 路由
     * @return null | Object
     */
    exec(route) {
        let matches = new RegExp(this.combinedRoutePattern).exec(route);

        // 没有匹配到路由
        if(null === matches) {
            return null;
        }

        // 匹配到路由
        let subPatternPosition = this.getSubPatternPosition(matches);
        let routeIndex = -1 === subPatternPosition
            ? this.getMatchedRouteIndexByPath(matches.input)
            : this.getMatchedRouteIndexBySubPattern(subPatternPosition);

        let parameters = null;
        let parameterNames = this.combinedRouteParameters[routeIndex];
        if(null !== parameterNames) {
            parameters = {};

            for(let i=0,len=parameterNames.length; i<len; i++) {
                parameters[ parameterNames[i] ] =
                    matches[subPatternPosition + i];
            }
        }

        return {
            handler: this.routesMap[routeIndex].handler,
            parameters: parameters
        };
    }

    /**
     * 查找匹配到的子模式位置
     */
    getSubPatternPosition(matches) {
        let position = -1;

        // matches: [ '/path/123', undefined, '/path/123', 123]
        for(let i=1,len=matches.length; i<len; i++) {
            if(undefined !== matches[i]) {
                position = i;
                break;
            }
        }

        return position;
    }

    /**
     * find route position which has no parameters
     *
     * @param {String} path
     * @return {Number}
     */
    getMatchedRouteIndexByPath(path) {
        let index = 0;

        let str = StringHelper.trimChar(path, '/');
        for(let i=0, len=this.routesMap.length; i<len; i++) {
            if( str === StringHelper.trimChar(this.routesMap[i].route, '/') ) {
                index = i;
                break;
            }
        }

        return index;
    }

    /**
     * 查找匹配的路由位置
     *
     * @param {Number} subPatternPosition 匹配的子模式位置
     * @return {Number}
     */
    getMatchedRouteIndexBySubPattern(subPatternPosition) {
        let find = 0;
        let str = '';
        let pattern = this.combinedRoutePattern;

        for(let i=0, len=pattern.length - 1; i<len; i++) {
            if('(' === pattern[i] && '?' !== pattern[i + 1]) {
                find += 1;
            }

            if(find === subPatternPosition) {
                str = pattern.substring(0, i);
                break;
            }
        }

        find = 0;
        for(let i=0, len=str.length; i<len; i++) {
            if('|' === str[i]) {
                find += 1;
            }
        }

        return find;
    }

}

module.exports = RegExpRouter;
