/**
 * @author afu
 * @license MIT
 */
import Candy = require('../Candy');
import CandyJS = require('../index');
import Request = require('../http/Request');
import CoreApp = require('../core/Application');
import Controller = require('./Controller');
import StringHelper = require('../helpers/StringHelper');
import InvalidRouteException = require('../core/InvalidRouteException');

/**
 * web 应用
 */
class Application extends CoreApp {

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
    public interceptAll: any;

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
    public routesMap: any;

    /**
     * 注册的模块
     *
     * 'modules': {
     *     'bbs': 'app/modules/bbs'
     * }
     *
     */
    public modules: any;

    /**
     * 默认视图类
     */
    public defaultView: string;

    /**
     * 默认控制器命名空间
     */
    public defaultControllerNamespace: string;

    /**
     * 默认路由
     */
    public defaultRoute: string;

    /**
     * 默认控制器
     */
    public defaultControllerId: string;

    constructor(config: any) {
        super(config);

        this.interceptAll = null;
        this.routesMap = null;
        this.modules = null;
        this.defaultView = 'candy/web/View';
        this.defaultControllerNamespace = 'app/controllers';
        this.defaultRoute = 'index/index';
        this.defaultControllerId = 'index';

        Candy.config(this, config);
    }

    /**
     * @inheritdoc
     */
    public requestListener(request: any, response: any): void {
        let route = new Request(request).createURL().pathname;

        CandyJS.getLogger().trace('Route requested: ' + route);

        let controller = this.createController(route);

        if(null === controller) {
            throw new InvalidRouteException('The route requested is not found');
        }

        // 是否继承自框架控制器
        if( !(controller instanceof Controller) ) {
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
    public handlerException(response: any, exception: any): void {
        let handler = Candy.createObject(this.exceptionHandler);

        handler.handlerException(response, exception);
    }

    /**
     * 创建控制器实例
     *
     * @param {String} route 路由
     */
    private createController(route: string): Controller {
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
        if('' === route || '/' === route) {
            route = this.defaultRoute;
        }

        // 检测非法
        if(route.indexOf('//') >= 0) {
            return null;
        }

        // 拦截路由
        if(null !== this.interceptAll) {
            CandyJS.getLogger().trace('Route intercepted: ' + route);

            return Candy.createObject(this.interceptAll);
        }

        // 解析路由
        // 目录前缀或模块 id
        let id = '';
        let pos = route.indexOf('/');
        if(-1 !== pos) {
            id = route.substring(0, pos);
            route = route.substring(pos + 1);
            controllerId = route;

        } else {
            id = route;
            route = '';
        }

        // 保存前缀
        viewPath = id;

        // 保存当前控制器标识
        if( -1 !== (pos = route.lastIndexOf('/')) ) {
            viewPath = viewPath + '/' + route.substring(0, pos);

            controllerId = route.substring(pos + 1);
        }
        if('' === controllerId) {
            controllerId = this.defaultControllerId;
        }

        // 搜索顺序 用户配置 -> 模块控制器 -> 普通控制器
        // 模块没有前缀目录
        let clazz = null;
        if(null !== this.routesMap && undefined !== this.routesMap[id]) {
            CandyJS.getLogger().trace('Create controller by routesMap: '
                + ('string' === typeof this.routesMap[id]
                    ? this.routesMap[id] : this.routesMap[id].classPath));

            return Candy.createObject(this.routesMap[id], {
                moduleId: moduleId,
                controllerId: controllerId,
                viewPath: viewPath
            });
        }

        if(null !== this.modules && undefined !== this.modules[id]) {
            CandyJS.getLogger().trace('Create module controller: ' + this.modules[id]);

            moduleId = id;
            clazz = StringHelper.trimChar(this.modules[id], '/')
                + '/controllers/'
                + StringHelper.ucFirst(controllerId) + 'Controller';

            return Candy.createObjectAsString(clazz, {
                moduleId: moduleId,
                controllerId: controllerId,
                viewPath: viewPath
            });
        }

        CandyJS.getLogger().trace('Create common controller: ' + clazz);

        clazz = this.defaultControllerNamespace
            + '/'
            + viewPath
            + '/'
            + StringHelper.ucFirst(controllerId) + 'Controller';

        return Candy.createObjectAsString(clazz, {
            moduleId: moduleId,
            controllerId: controllerId,
            viewPath: viewPath
        });
    }

}

export = Application;
