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
            params: params
        };
    }

    /**
     * 合并路由
     *
     * @param {Array} routes 路由数组
     *
     * [ 'route1', 'route2' ]
     *
     * @return {Object}
     *
     * eg.
     * {
     *      pattern: '(?:xxx\\/?$)|(?:(\\d+)\\/?$)',
     *      params: [ null, ['uid'] ]
     * }
     */
    combineRoutes(routes) {
        let patterns = [];
        let params = [];

        for(let parsedRoute=null, i=0, len=routes.length; i<len; i++) {
            parsedRoute = this.toRegExpString(routes[i]);

            patterns.push( '(?:' + parsedRoute.pattern + ')' );
            params.push(parsedRoute.params);
        }

        return {
            pattern: patterns.join('|'),
            params: params
        };
    }

}

module.exports = RegExpRouter;
