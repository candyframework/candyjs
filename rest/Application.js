"use strict";
/**
 * @author afu
 * @license MIT
 */
const FastRouter = require("fast-regexp-router");
const Candy = require("../Candy");
const Request = require("../http/Request");
const CoreApp = require("../core/Application");
const InvalidRouteException = require("../core/InvalidRouteException");
/**
 * rest application
 */
class Application extends CoreApp {
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
        /**
         * 是否合并路由
         */
        this.combineRoutes = false;
        this.cachedRouter = new Map();
        Candy.config(this, config);
    }
    /**
     * 请求处理
     *
     * @typedef {import('http').IncomingMessage} IncomingMessage
     * @typedef {import('http').ServerResponse} ServerResponse
     * @param {IncomingMessage} request
     * @param {ServerResponse} response
     */
    requestListener(request, response) {
        let route = new Request(request).createURL().pathname;
        let ret = this.resolveRoutes(route, request.method);
        if (null === ret) {
            throw new InvalidRouteException('The route requested is not found');
        }
        // handler is function
        if ('function' === typeof ret.handler) {
            ret.handler(request, response, ret.parameters);
            return;
        }
        // handler is string
        let pos = ret.handler.indexOf(Application.separator);
        let obj = null;
        if (-1 === pos) {
            obj = Candy.createObjectAsString(ret.handler);
            obj.run(request, response, ret.parameters);
        }
        else {
            obj = Candy.createObjectAsString(ret.handler.substring(0, pos));
            obj[ret.handler.substring(pos + 1)](request, response, ret.parameters);
        }
    }
    /**
     * 解析路由
     *
     * @param {String} route 路由
     * @param {String} httpMethod 请求方法
     */
    resolveRoutes(route, httpMethod) {
        let routesMap = this.methods[httpMethod];
        if (0 === routesMap.length) {
            return null;
        }
        if (this.cachedRouter.has(httpMethod)) {
            return this.combineRoutes
                ? this.cachedRouter.get(httpMethod).exec(route)
                : this.cachedRouter.get(httpMethod).execInOrder(route);
        }
        let fastRouter = new FastRouter();
        fastRouter.setRoutes(routesMap);
        this.cachedRouter.set(httpMethod, fastRouter);
        return this.combineRoutes
            ? fastRouter.exec(route)
            : fastRouter.execInOrder(route);
    }
    /**
     * Adds a route to the collection
     *
     * @param {String} httpMethod
     * @param {String} route
     * @param {Function | String} handler
     */
    addRoute(httpMethod, route, handler) {
        this.methods[httpMethod].push({
            route: route,
            handler: handler
        });
    }
    /**
     * Adds routes to the collection
     *
     * @param {String[]} httpMethods
     * @param {String} route
     * @param {Function | String} handler
     */
    addRoutes(httpMethods, route, handler) {
        for (let i = 0, len = httpMethods.length; i < len; i++) {
            this.methods[httpMethods[i]].push({
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
Application.separator = '@';
module.exports = Application;
