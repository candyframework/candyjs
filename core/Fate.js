/**
 * @author
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const CandyJS = require('../index');
const StringHelper = require('../helpers/StringHelper');

/**
 * 核心
 */
class Fate {

    /**
     * constructor
     */
    constructor() {
        /**
         * @property {String | Object} interceptAll 拦截所有路由
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
         * @property {Object} routesMap 实现路由到控制器转换配置
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
         * @property {Object} modules 注册的模块
         *
         * 'modules': {
         *     'bbs': 'app/modules/bbs'
         * }
         */
        this.modules = null;

        /**
         * @property {String} defaultRoute 默认路由
         */
        this.defaultRoute = 'index/index';

        /**
         * @property {String} defaultControllerNamespace 默认控制器命名空间
         */
        this.defaultControllerNamespace = 'app/controllers';

        /**
         * @property {String} defaultControllerId 默认控制器
         */
        this.defaultControllerId = 'index';
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
        if('' === route || '/' === route) {
            route = this.defaultRoute;
        }

        // 检测非法
        if(!/^[\w\-\/]+$/.test(route) || route.indexOf('//') >= 0) {
            return null;
        }

        // 拦截路由
        if(null !== this.interceptAll) {
            CandyJS.getLogger().trace('Starting to create controller: '
                + ('string' === typeof this.interceptAll
                    ? this.interceptAll : this.interceptAll.classPath));

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
            CandyJS.getLogger().trace('Starting to create controller: '
                + ('string' === typeof this.routesMap[id]
                    ? this.routesMap[id] : this.routesMap[id].classPath));

            return Candy.createObject(this.routesMap[id], {
                moduleId: moduleId,
                controllerId: controllerId,
                viewPath: viewPath
            });
        }

        if(null !== this.modules && undefined !== this.modules[id]) {
            moduleId = id;

            clazz = StringHelper.trimChar(this.modules[id], '/')
                + '/controllers/'
                + StringHelper.ucFirst(controllerId) + 'Controller';

            CandyJS.getLogger().trace('Starting to create controller: ' + this.modules[id]);

            return Candy.createObject(clazz, {
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

        CandyJS.getLogger().trace('Starting to create controller: ' + clazz);

        return Candy.createObject(clazz, {
            moduleId: moduleId,
            controllerId: controllerId,
            viewPath: viewPath
        });
    }

}

module.exports = Fate;
