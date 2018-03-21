/**
 * @author
 * @license MIT
 */
'use strict';

var Candy = require('../Candy');
var Request = require('./Request');
var CoreRouter = require('../core/Router');
var StringHelper = require('../helpers/StringHelper');
var InvalidCallException = require('../core/InvalidCallException');

class Restful extends CoreRouter {

    /**
     * listen request
     */
    static requestListener(request, response) {
        var route = Request.parseUrl(request).pathname;

        // 检测非法
        if(!Restful.isValidRoute(route)) {
            throw new InvalidCallException('The route: '+ route +' is invalid');
        }

        // {paramValues, handler}
        var ret = true === Candy.app.combineRoutes
            ? Restful.resolveRoutesCombine(route, request.method)
            : Restful.resolveRoutesOneByOne(request, route, request.method);

        if(null === ret) {
            throw new InvalidCallException('The REST route: ' + route + ' not found');
        }

        var args = null === ret.paramValues ? [null] : ret.paramValues;

        // handler is function
        if('function' === typeof ret.handler) {
            ret.handler(request, response, ...args);

            return;
        }

        // handler is string
        var pos = ret.handler.indexOf(Restful.separator);
        var obj = null;
        if(-1 === pos) {
            obj = Candy.createObject(ret.handler);
            obj.index(request, response, ...args);

        } else {
            obj = Candy.createObject( ret.handler.substring(0, pos) );
            obj[ ret.handler.substring(pos + 1) ](
                request,
                response,
                ...args);
        }
    }

    /**
     * 合并解析路由
     *
     * @param {String} route 路由
     * @param {String} httpMethod 请求方法
     * @return {JSON | null}
     */
    static resolveRoutesCombine(route, httpMethod) {
        var ret = null;

        // [ {pattern, handler} ... ]
        var handlers = Restful.methods[httpMethod];
        var tmp = {};
        for(let i=0,len=handlers.length; i<len; i++) {
            tmp[handlers[i].pattern] = handlers[i].handler;
        }
        // {pattern, params, handler}
        var combinedRoute = Restful.combineRoutes(tmp);

        var matches = route.match( new RegExp('(?:' + combinedRoute.pattern + ')$') );

        // 路由成功匹配
        if(null !== matches) {
            ret = {};

            var subPatternPosition = -1;
            // matches: [ 'xyz/other', undefined, undefined, undefined, 'xyz/other']
            for(let i=1,len=matches.length; i<len; i++) {
                if(undefined !== matches[i]) {
                    subPatternPosition = i;
                    break;
                }
            }

            var matchedRouteSegment = Restful.getMatchedSegmentBySubPatternPosition(
                combinedRoute, subPatternPosition);

            ret.handler = combinedRoute.handler[matchedRouteSegment];
            ret.paramValues = null;

            // 有参数
            if(null !== combinedRoute.params[matchedRouteSegment]) {
                ret.paramValues = new Array(combinedRoute.params[matchedRouteSegment].length);
                for(let i=0,len=combinedRoute.params[matchedRouteSegment].length; i<len; i++) {
                    ret.paramValues[i] = matches[subPatternPosition + i + 1];
                }
            }
        }

        return ret;
    }

    /**
     * 依次解析路由
     *
     * @param {Object} request 请求对象
     * @param {String} route 路由
     * @param {String} httpMethod 请求方法
     * @return {JSON | null}
     */
    static resolveRoutesOneByOne(request, route, httpMethod) {
        // {pattern, handler, paramKeys, paramValues}
        var matchedHandler = null;

        var handlers = Restful.methods[httpMethod];  // [ {pattern, handler} ... ]
        var parsedRoute = null;
        var matches = null;

        for(let i=0,len=handlers.length; i<len; i++) {
            parsedRoute = Restful.parse(handlers[i].pattern);

            handlers[i].paramKeys = parsedRoute.params;  // null or array
            handlers[i].paramValues = null;

            // end with $ 精确匹配
            matches = route.match( new RegExp(parsedRoute.pattern + '$') );

            // 匹配到路由
            if(null !== matches) {
                matchedHandler = handlers[i];

                // 存储参数
                if(null !== matchedHandler.paramKeys) {
                    let requestInstance = new Request(request);
                    matchedHandler.paramValues = new Array(matchedHandler.paramKeys.length);

                    for(let j=0,l=matchedHandler.paramKeys.length; j<l; j++) {
                        requestInstance.setQueryString(
                            matchedHandler.paramKeys[j],
                            matches[j+1]);

                        matchedHandler.paramValues[j] = matches[j+1];
                    }
                }

                // 匹配到就退出
                break;
            }
        }

        return matchedHandler;
    }

    /**
     * 检测路由合法性
     *
     * @param {String} route 路由
     * @return {Boolean}
     */
    static isValidRoute(route) {
        // 检测非法 与 路径中不能有双斜线 '//'
        if(!/^[\w\-\/]+$/.test(route) || route.indexOf('//') >= 0) {
            return false;
        }

        return true;
    }

    /**
     * 合并路由
     *
     * @param {Object} routes
     *
     * { pattern: any ... }
     *
     * @return {JSON}
     *
     * eg.
     *
     * {
     *   pattern: '(abc\\/(\\d+))|(abc)|(xyz\\/other)',
     *   params: [ [ 'id' ], null, null ],
     *   handler: any
     * }
     *
     */
    static combineRoutes(routes) {
        var ret = {};
        var patternArray = [];
        var paramArray = [];
        var handler = [];  // 路由配置

        var parsedRoute = null;
        for(let reg in routes) {
            parsedRoute = Restful.parse(reg);

            // 为每个模式添加一个括号 用于定位匹配到的是哪一个模式
            patternArray.push( '(' + parsedRoute.pattern + ')' );
            paramArray.push(parsedRoute.params);
            handler.push(routes[reg]);
        }

        ret.pattern = patternArray.join('|');
        ret.params = paramArray;
        ret.handler = handler;

        return ret;
    }

    /**
     * 查找匹配的路由的位置
     *
     * @param {Object} combinedRoute 合并的路由
     * @param {Number} subPatternPosition 匹配的子模式位置
     * @return {Number}
     */
    static getMatchedSegmentBySubPatternPosition(combinedRoute, subPatternPosition) {
        // '(' 在 pattern 中第 subPatternPosition 次出现的位置
        // 用于确定当前路由匹配的是第几部分
        var segment = StringHelper.nIndexOf(combinedRoute.pattern, '(', subPatternPosition);
        var tmpLine = combinedRoute.pattern.substring(0, segment).match(/\|/g);
        // 没有匹配到竖线 说明匹配的是第一部分
        segment = null === tmpLine ? 0 : tmpLine.length;

        return segment;
    }

    /**
     * Adds a route to the collection
     *
     * @param {String | Array} httpMethod
     * @param {String} pattern
     * @param {Function | String} handler
     */
    static addRoute(httpMethod, pattern, handler) {
        if('string' === typeof httpMethod) {
            Restful.methods[httpMethod].push( {pattern: pattern, handler: handler} );
            
            return;
        }

        for(let i=0,len=httpMethod.length; i<len; i++) {
            Restful.methods[httpMethod[i]].push( {pattern: pattern, handler: handler} );
        }
    }

    /**
     * get
     */
    static get(pattern, handler) {
        Restful.addRoute('GET', pattern, handler);
    }

    /**
     * post
     */
    static post(pattern, handler) {
        Restful.addRoute('POST', pattern, handler);
    }

    /**
     * put
     */
    static put(pattern, handler) {
        Restful.addRoute('PUT', pattern, handler);
    }

    /**
     * delete
     */
    static delete(pattern, handler) {
        Restful.addRoute('DELETE', pattern, handler);
    }

    /**
     * patch
     */
    static patch(pattern, handler) {
        Restful.addRoute('PATCH', pattern, handler);
    }

    /**
     * head
     */
    static head(pattern, handler) {
        Restful.addRoute('HEAD', pattern, handler);
    }

    /**
     * options
     */
    static options(pattern, handler) {
        Restful.addRoute('OPTIONS', pattern, handler);
    }

}

/**
 * 请求方法
 *
 * each method has the follow structure
 *
 * [ {pattern: pattern, handler: handler} ... ]
 *
 */
Restful.methods = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
    PATCH: [],
    HEAD: [],
    OPTIONS: []
};

/**
 * class and method separate
 */
Restful.separator = '@';

module.exports = Restful;
