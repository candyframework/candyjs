import IApplication from './core/IApplication';

export default interface IApp extends IApplication {
    /**
     * 日志配置
     */
    log?: any;

    /**
     * 缓存配置
     */
    cache?: any;

    /**
     * 国际化配置
     */
    translator?: any;

    /**
     * 拦截配置
     */
    interceptAll?: any;

    /**
     * 自定义路由
     */
    routesMap?: any;

    /**
     * 模块配置
     */
    modules?: any;

    /**
     * 默认视图配置
     */
    defaultView?: any;
}
