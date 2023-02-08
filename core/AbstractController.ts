/**
 * @author afu
 * @license MIT
 */
import Component = require('./Component');
import ActionEvent = require('./ActionEvent');
import FilterChain = require('./FilterChain');
import FilterFactory = require('./FilterFactory');

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
    public filterChain: FilterChain = FilterFactory.createFilterChain(this);

    /**
     * constructor
     */
    constructor(context: any) {
        super();

        this.context = context;
    }

    /**
     * 声明过滤器列表
     *
     * ```
     * [
     *      filterInstance,
     *      'filterClassPath'
     *      {'classPath': 'filterClassPath', otherProps: xxx}
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

        if(false === actionEvent.valid) {
            return;
        }

        this.filterChain.doFilter(request, response);

        this.afterAction(actionEvent);
    }

    /**
     * 控制器入口
     */
    public abstract run(request: any, response: any): void;

    /**
     * 渲染视图
     *
     * @param {String} view 视图名
     * @param {any} parameters 参数
     */
    public abstract render(view: string, parameters?: any): any;

}

export = AbstractController;
