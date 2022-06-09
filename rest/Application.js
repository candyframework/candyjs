"use strict";
const FastRouter = require("fast-regexp-router");
const Candy = require("../Candy");
const Request = require("../http/Request");
const CoreApp = require("../core/Application");
const InvalidRouteException = require("../core/InvalidRouteException");
class Application extends CoreApp {
    constructor(config) {
        super(config);
        this.methods = {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: [],
            PATCH: [],
            HEAD: [],
            OPTIONS: []
        };
        this.combineRoutes = false;
        this.cachedRouter = new Map();
        Candy.configure(this, config);
    }
    requestListener(request, response) {
        let route = new Request(request).createURL().pathname;
        let ret = this.resolveRoutes(route, request.method);
        if (null === ret) {
            throw new InvalidRouteException('The route requested is not found');
        }
        if ('function' === typeof ret.handler) {
            ret.handler(request, response, ret.parameters);
            return;
        }
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
    addRoute(httpMethod, route, handler) {
        this.methods[httpMethod].push({
            route: route,
            handler: handler
        });
    }
    addRoutes(httpMethods, route, handler) {
        for (let i = 0, len = httpMethods.length; i < len; i++) {
            this.methods[httpMethods[i]].push({
                route: route,
                handler: handler
            });
        }
    }
    get(route, handler) {
        this.addRoute('GET', route, handler);
    }
    post(route, handler) {
        this.addRoute('POST', route, handler);
    }
    put(route, handler) {
        this.addRoute('PUT', route, handler);
    }
    delete(route, handler) {
        this.addRoute('DELETE', route, handler);
    }
    patch(route, handler) {
        this.addRoute('PATCH', route, handler);
    }
    head(route, handler) {
        this.addRoute('HEAD', route, handler);
    }
    options(route, handler) {
        this.addRoute('OPTIONS', route, handler);
    }
    handlerException(exception, response) {
        let handler = Candy.createObject(this.exceptionHandler, this);
        handler.handlerException(exception, response);
    }
}
Application.separator = '@';
module.exports = Application;
