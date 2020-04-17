/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
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
     * [ {route: xxx, handler: xxx} ]
     *
     */
    constructor(routesMap) {
        this.routesMap = routesMap;
        this.combinedRoute = null;
    }

    /**
     * 合并路由
     *
     * @return {Object}
     *
     * eg.
     * {
     *      pattern: '(?:xxx\\/?$)|(?:(\\d+)\\/?$)',
     *      params: [ null, ['uid'] ]
     * }
     */
    combineRoutes() {
        let patterns = [];
        let parameters = [];

        for(let parsedRoute=null, i=0, len=this.routesMap.length; i<len; i++) {
            parsedRoute = this.toRegExpString(this.routesMap[i].route);

            patterns.push( '(?:' + parsedRoute.pattern + ')' );
            parameters.push(parsedRoute.parameters);
        }

        this.combinedRoute = {
            pattern: patterns.join('|'),
            parameters: parameters
        };

        return this.combinedRoute;
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
    toRegExpString(patternString) {
        let params = null;

        // format /home/(uid)
        let pattern = patternString.replace(/\{/g, '(').replace(/\}/g, ')');

        // search params
        let matchedParams = pattern.match(/\([^:\)]+/g);

        // replace params
        if(null !== matchedParams) {
            params = [];

            for(let i=0,len=matchedParams.length; i<len; i++) {
                pattern = pattern.replace(matchedParams[i], '(');
                pattern = pattern.replace(':', '');
                pattern = pattern.replace('()', '(\\w+)');

                params.push( matchedParams[i].substring(1) );
            }
        }

        pattern = StringHelper.trimChar(pattern, '/');
        pattern = '^\\/' + pattern.replace(/\//g, '\\/') + '\\/?$';

        return {
            pattern: pattern,
            parameters: params
        };
    }

    exec(route) {
        let matches = new RegExp(this.combinedRoute.pattern).exec(route);

        // 没有匹配到路由
        if(null === matches) {
            return null;
        }

        // 匹配到路由
        let matchedPosition = this.getMatchedSubPatternPosition(matches);
        let segmentPosition = -1 === matchedPosition
            ? this.getMatchedRoutePositionByInput(matches.input)
            : this.getMatchedRoutePositionBySubPattern(matchedPosition);

        let parameters = null;
        let parameterNames = this.combinedRoute.parameters[segmentPosition];
        if(null !== parameterNames) {
            parameters = {};

            for(let i=0,len=parameterNames.length; i<len; i++) {
                parameters[ parameterNames[i] ] =
                    matches[matchedPosition + i];
            }
        }

        return {
            handler: this.routesMap[segmentPosition].handler,
            parameters: parameters
        };
    }

    getMatchedSubPatternPosition(matches) {
        let subPatternPosition = -1;

        // matches: [ '/path/123', undefined, '/path/123', 123]
        for(let i=1,len=matches.length; i<len; i++) {
            if(undefined !== matches[i]) {
                subPatternPosition = i;
                break;
            }
        }

        return subPatternPosition;
    }

    /**
     * 查找匹配的路由位置
     */
    getMatchedRoutePositionByInput(input) {
        let index = 0;

        let str = StringHelper.trimChar(input, '/');
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
     * @param {String} pattern 合并的模式路由
     * @param {Number} subPatternPosition 匹配的子模式位置
     * @return {Number}
     */
    getMatchedRoutePositionBySubPattern(subPatternPosition) {
        let find = 0;
        let str = '';
        let pattern = this.combinedRoute.pattern;

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
