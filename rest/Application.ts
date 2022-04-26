/**
 * @author afu
 * @license MIT
 */
import FastRouter = require('fast-regexp-router');

import Candy = require('../Candy');
import Request = require('../http/Request');
import CoreApp = require('../core/Application');
import InvalidRouteException = require('../core/InvalidRouteException');

/**
 * rest application
 */
class Application extends CoreApp {

    /**
     * class and method separator
     */
    static separator: string = '@';

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
    public methods: any = {
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
    public combineRoutes: boolean = false;

    public cachedRouter: Map<string, FastRouter> = new Map();

    constructor(config: any) {
        super(config);

        Candy.configure(this, config);
    }

    /**
     * 请求处理
     *
     * @typedef {import('http').IncomingMessage} IncomingMessage
     * @typedef {import('http').ServerResponse} ServerResponse
     * @param {IncomingMessage} request
     * @param {ServerResponse} response
     */
    public requestListener(request: any, response: any): void {
        let route = new Request(request).createURL().pathname;
        let ret = this.resolveRoutes(route, request.method);

        if(null === ret) {
            throw new InvalidRouteException('The route requested is not found');
        }

        // handler is function
        if('function' === typeof ret.handler) {
            ret.handler(request, response, ret.parameters);

            return;
        }

        // handler is string
        let pos = ret.handler.indexOf(Application.separator);
        let obj = null;
        if(-1 === pos) {
            obj = Candy.createObjectAsString(ret.handler);
            obj.run(request, response, ret.parameters);

        } else {
            obj = Candy.createObjectAsString( ret.handler.substring(0, pos) );
            obj[ ret.handler.substring(pos + 1) ](request, response, ret.parameters);
        }
    }

    /**
     * 解析路由
     *
     * @param {String} route 路由
     * @param {String} httpMethod 请求方法
     */
    private resolveRoutes(route: string, httpMethod: string): any {
        let routesMap = this.methods[httpMethod];
        if(0 === routesMap.length) {
            return null;
        }

        if(this.cachedRouter.has(httpMethod)) {
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
    public addRoute(httpMethod: string, route: string, handler: any): void {
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
    public addRoutes(httpMethods: string[], route: string, handler: any): void {
        for(let i=0,len=httpMethods.length; i<len; i++) {
            this.methods[httpMethods[i]].push({
                route: route,
                handler: handler
            });
        }
    }

    /**
     * get
     */
    public get(route: string, handler: any): void {
        this.addRoute('GET', route, handler);
    }

    /**
     * post
     */
    public post(route: string, handler: any): void {
        this.addRoute('POST', route, handler);
    }

    /**
     * put
     */
    public put(route: string, handler: any): void {
        this.addRoute('PUT', route, handler);
    }

    /**
     * delete
     */
    public delete(route: string, handler: any): void {
        this.addRoute('DELETE', route, handler);
    }

    /**
     * patch
     */
    public patch(route: string, handler: any): void {
        this.addRoute('PATCH', route, handler);
    }

    /**
     * head
     */
    public head(route: string, handler: any): void {
        this.addRoute('HEAD', route, handler);
    }

    /**
     * options
     */
    public options(route: string, handler: any): void {
        this.addRoute('OPTIONS', route, handler);
    }

    /**
     * @inheritdoc
     */
    public handlerException(exception: any, response: any): void {
        let handler = Candy.createObject(this.exceptionHandler, this);

        handler.handlerException(exception, response);
    }

}

export = Application;
