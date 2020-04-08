/**
 * @author
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const Request = require('./Request');
const RegExpRouter = require('../utils/RegExpRouter');
const CoreApp = require('../core/Application');
const StringHelper = require('../helpers/StringHelper');
const InvalidCallException = require('../core/InvalidCallException');

class RestApplication extends CoreApp {

    constructor(config) {
        super(config);

        /**
         * 请求方法
         *
         * each method has the follow structure
         *
         * [
         *      { route: route1, handler: callbackFunction1 },
         *      { route: route2, handler: callbackFunction2 }
         * ]
         *
         */
        this.methods = {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: [],
            PATCH: [],
            HEAD: [],
            OPTIONS: []
        };

        Candy.config(this, config);
    }

    /**
     * 请求处理
     *
     * @param {Object} request
     * @param {Object} response
     */
    requestListener(request, response) {
        let route = Request.parseUrl(request).pathname;
        let ret = this.resolveRoutes(route, request.method);

        if(null === ret) {
            throw new InvalidCallException('The REST route: ' + route + ' not found');
        }

        // handler is function
        if('function' === typeof ret.handler) {
            ret.handler(request, response, ret.paramValues);

            return;
        }

        // handler is string
        let pos = ret.handler.indexOf(RestApplication.separator);
        let obj = null;
        if(-1 === pos) {
            obj = Candy.createObject(ret.handler);
            obj.run(request, response, ret.paramValues);

        } else {
            obj = Candy.createObject( ret.handler.substring(0, pos) );
            obj[ ret.handler.substring(pos + 1) ](request, response, ret.paramValues);
        }
    }

    /**
     * 解析路由
     *
     * @param {String} route 路由
     * @param {String} httpMethod 请求方法
     * @return {Object | null}
     */
    resolveRoutes(route, httpMethod) {
        let routesMap = this.methods[httpMethod];
        if(0 === routesMap.length) {
            return null;
        }

        let routes = [];
        for(let i=0,len=routesMap.length; i<len; i++) {
            routes.push(routesMap[i].route);
        }

        let combinedRoute = new RegExpRouter().combineRoutes(routes);
        let matches = new RegExp(combinedRoute.pattern).exec(route);
        // 没有匹配到路由
        if(null === matches) {
            return null;
        }

        // 匹配到路由
        let matchedPosition = this.getMatchedSubPatternPosition(matches);
        let segmentPosition = -1 === matchedPosition
            ? this.getMatchedRoutePositionByInput(routes, matches.input)
            : this.getMatchedRoutePositionBySubPattern(combinedRoute.pattern, matchedPosition);

        let paramValues = null;
        let paramNames = combinedRoute.params[segmentPosition];
        if(null !== paramNames) {
            paramValues = {};

            for(let i=0,len=paramNames.length; i<len; i++) {
                paramValues[ paramNames[i] ] =
                    matches[matchedPosition + i];
            }
        }

        return {
            handler: routesMap[segmentPosition].handler,
            paramValues: paramValues
        };
    }

    /**
     * 获取子模式位置
     */
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
    getMatchedRoutePositionByInput(routes, input) {
        let index = 0;

        let str = StringHelper.trimChar(input, '/');
        for(let i=0, len=routes.length; i<len; i++) {
            if( str === StringHelper.trimChar(routes[i], '/') ) {
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
    getMatchedRoutePositionBySubPattern(pattern, subPatternPosition) {
        let find = 0;
        let str = '';

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

    /**
     * Adds a route to the collection
     *
     * @param {String | Array} httpMethod
     * @param {String} route
     * @param {Function | String} handler
     */
    addRoute(httpMethod, route, handler) {
        if('string' === typeof httpMethod) {
            this.methods[httpMethod].push({
                route: route,
                handler: handler
            });

            return;
        }

        for(let i=0,len=httpMethod.length; i<len; i++) {
            this.methods[httpMethod[i]].push({
                route: route,
                handler: handler
            });
        }
    }

    /**
     * get
     */
    get(route, handler) {
        this.addRoute('GET', route, handler);
    }

    /**
     * post
     */
    post(route, handler) {
        this.addRoute('POST', route, handler);
    }

    /**
     * put
     */
    put(route, handler) {
        this.addRoute('PUT', route, handler);
    }

    /**
     * delete
     */
    delete(route, handler) {
        this.addRoute('DELETE', route, handler);
    }

    /**
     * patch
     */
    patch(route, handler) {
        this.addRoute('PATCH', route, handler);
    }

    /**
     * head
     */
    head(route, handler) {
        this.addRoute('HEAD', route, handler);
    }

    /**
     * options
     */
    options(route, handler) {
        this.addRoute('OPTIONS', route, handler);
    }

    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        let handler = Candy.createObject(this.exceptionHandler);

        handler.handlerException(response, exception);
    }

}

/**
 * class and method separate
 */
RestApplication.separator = '@';

module.exports = RestApplication;
