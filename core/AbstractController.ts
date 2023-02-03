/**
 * @author afu
 * @license MIT
 */
import Candy  = require('../Candy');
import Component = require('./Component');
import ActionEvent = require('./ActionEvent');
import FilterChain = require('./FilterChain');

/**
 * 控制器基类
 */
abstract class AbstractController<CT> extends Component {

    /**
     * 前置事件
     */
    static EVENT_BEFORE_ACTION: string = 'beforeAction';

    /**
     * 后置事件
     */
    static EVENT_AFTER_ACTION: string = 'afterAction';

    /**
     * 上下文环境 用于保存当前请求相关的信息
     */
    public context: CT;

    /**
     * the filter collection
     */
    public filterChain: FilterChain = new FilterChain();

    /**
     * constructor
     */
    constructor(context: any) {
        super();

        this.context = context;
        this.initializeFilterChain();
    }

    /**
     * 初始化过滤链
     */
    private initializeFilterChain(): void {
        this.filterChain.setResource(this);

        let filters = this.filters();
        if(null === filters) {
            return;
        }

        for(let filter of filters) {
            if('string' === typeof filter) {
                filter = Candy.createObject(filter);
            }

            this.filterChain.addFilter(filter);
        }
    }

    /**
     * 声明过滤器列表
     *
     * ```
     * [
     *      instanceFilterClass,
     *      'filterClassPath'
     * ]
     * ```
     *
     */
    public filters(): any[] {
        return null;
    }

    /**
     * 控制器方法执行前
     *
     * @param {ActionEvent} actionEvent
     */
    public beforeAction(actionEvent: ActionEvent): void {
        this.trigger(AbstractController.EVENT_BEFORE_ACTION, actionEvent);
    }

    /**
     * 控制器方法执行后
     *
     * @param {ActionEvent} actionEvent
     */
    public afterAction(actionEvent: ActionEvent): void {
        this.trigger(AbstractController.EVENT_AFTER_ACTION, actionEvent);
    }

    /**
     * 执行控制器的方法
     *
     * @param {any} request
     * @param {any} response
     */
    public runControllerAction(request: any, response: any): void {
        let actionEvent = new ActionEvent();
        actionEvent.request = request;
        actionEvent.response = response;

        this.beforeAction(actionEvent);

        this.filterChain.doFilter(request, response);

        this.afterAction(actionEvent);
    }

    /**
     * 执行控制器入口
     */
    public abstract run(request: any, response: any): void;

    /**
     * 渲染文件 须由子类进行实现
     *
     * @param {String} view 视图名
     * @param {any} parameters 参数
     */
    public abstract render(view: string, parameters?: any): any;

}

export = AbstractController;
