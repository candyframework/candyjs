"use strict";
/**
 * @author afu
 * @license MIT
 */
const Candy = require("../Candy");
const Request = require("../http/Request");
const CoreApp = require("../core/Application");
const StringHelper = require("../helpers/StringHelper");
const InvalidRouteException = require("../core/InvalidRouteException");
const Controller = require("./Controller");
/**
 * web 应用
 */
class Application extends CoreApp {
    constructor(config) {
        super(config);
        /**
         * 拦截所有路由
         *
         * 'app/some/Class'
         *
         * or a Object config
         *
         * {
         *      'classPath': 'app/some/Class',
         *      'property': 'value'
         * }
         *
         */
        this.interceptAll = null;
        /**
         * 实现路由到控制器转换配置
         *
         * {
         *     'u': 'app/controllers/user/IndexController',
         *     'account': {
         *         'classPath': 'app/controllers/user/IndexController',
         *         'property': 'value'
         *     }
         * }
         *
         */
        this.routesMap = null;
        /**
         * 注册的模块
         *
         * 'modules': {
         *     'bbs': 'app/modules/bbs'
         * }
         *
         */
        this.modules = null;
        /**
         * 默认视图类
         */
        this.defaultView = 'candy/web/View';
        /**
         * 默认控制器命名空间
         */
        this.defaultControllerNamespace = 'app/controllers';
        /**
         * 默认路由
         */
        this.defaultRoute = 'index/index';
        /**
         * 默认控制器
         */
        this.defaultControllerId = 'index';
        Candy.configure(this, config);
    }
    /**
     * @inheritdoc
     */
    requestListener(request, response) {
        let route = new Request(request).createURL().pathname;
        let controller = this.createController(route);
        if (null === controller) {
            throw new InvalidRouteException('The route requested is not found');
        }
        // 是否继承自框架控制器
        if (!(controller instanceof Controller)) {
            Reflect.apply(controller['run'], controller, [request, response]);
            // controller.run(request, response);
            return;
        }
        controller.context.request = request;
        controller.context.response = response;
        controller.runControllerAction(request, response);
    }
    /**
     * @inheritdoc
     */
    handlerException(exception, response) {
        let handler = Candy.createObject(this.exceptionHandler, this);
        handler.handlerException(exception, response);
    }
    /**
     * 创建控制器实例
     *
     * @param {String} route 路由
     */
    createController(route) {
        /**
         * @var {String} moduleId 当前的模块
         */
        let moduleId = '';
        /**
         * @var {String} controllerId 当前的控制器
         */
        let controllerId = '';
        /**
         * @var {String} viewPath 子目录
         *
         * eg. viewPath = ''  ->  app/views/xxx.html
         * eg. viewPath = 'subdir'  ->  app/views/subdir/xxx.html
         *
         */
        let viewPath = '';
        route = StringHelper.lTrimChar(route, '/');
        // route eg. index/index
        if ('' === route || '/' === route) {
            route = this.defaultRoute;
        }
        // 检测非法
        if (route.indexOf('//') >= 0) {
            return null;
        }
        // 拦截路由
        if (null !== this.interceptAll) {
            return Candy.createObject(this.interceptAll);
        }
        // 解析路由
        // 目录前缀或模块 id
        let id = '';
        let pos = route.indexOf('/');
        if (-1 !== pos) {
            id = route.substring(0, pos);
            route = route.substring(pos + 1);
            controllerId = route;
        }
        else {
            id = route;
            route = '';
        }
        // 保存前缀
        viewPath = id;
        // 保存当前控制器标识
        if (-1 !== (pos = route.lastIndexOf('/'))) {
            viewPath = viewPath + '/' + route.substring(0, pos);
            controllerId = route.substring(pos + 1);
        }
        if ('' === controllerId) {
            controllerId = this.defaultControllerId;
        }
        // 搜索顺序 用户配置 -> 模块控制器 -> 普通控制器
        // 模块没有前缀目录
        let clazz = '';
        if (null !== this.routesMap && undefined !== this.routesMap[id]) {
            return Candy.createObject(this.routesMap[id], {
                application: this,
                moduleId: moduleId,
                controllerId: controllerId,
                viewPath: viewPath
            });
        }
        if (null !== this.modules && undefined !== this.modules[id]) {
            moduleId = id;
            clazz = StringHelper.trimChar(this.modules[id], '/')
                + '/controllers/'
                + StringHelper.ucFirst(controllerId) + 'Controller';
            return Candy.createObjectAsString(clazz, {
                application: this,
                moduleId: moduleId,
                controllerId: controllerId,
                viewPath: viewPath
            });
        }
        clazz = this.defaultControllerNamespace
            + '/'
            + viewPath
            + '/'
            + StringHelper.ucFirst(controllerId) + 'Controller';
        return Candy.createObjectAsString(clazz, {
            application: this,
            moduleId: moduleId,
            controllerId: controllerId,
            viewPath: viewPath
        });
    }
}
module.exports = Application;
