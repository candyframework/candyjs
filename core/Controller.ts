/**
 * @author afu
 * @license MIT
 */
import Component = require('./Component');
import ActionEvent = require('./ActionEvent');

/**
 * 控制器基类
 */
class Controller extends Component {

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
    public context: any;

    /**
     * constructor
     */
    constructor(context: any) {
        super();

        this.context = context;
    }

    /**
     * 控制器方法执行前
     *
     * @param {ActionEvent} actionEvent
     */
    public beforeAction(actionEvent: ActionEvent): void {
        this.trigger(Controller.EVENT_BEFORE_ACTION, actionEvent);
    }

    /**
     * 控制器方法执行后
     *
     * @param {ActionEvent} actionEvent
     */
    public afterAction(actionEvent: ActionEvent): void {
        this.trigger(Controller.EVENT_AFTER_ACTION, actionEvent);
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

        // todo 这里没想好怎么设计 让我想想看
        this.beforeAction(actionEvent);

        if(true !== actionEvent.valid) {
            // will replace to response.writableEnded()
            if(!response.finished) {
                response.end('');
            }

            return;
        }

        this.run(request, response);

        this.afterAction(actionEvent);
    }

    /**
     * 执行控制器入口
     */
    public run(request: any, response: any): void {}

    /**
     * 渲染文件 须由子类进行实现
     *
     * @param {String} view 视图名
     * @param {any} parameters 参数
     */
    public render(view: string, parameters: any = null): any {}

}

export = Controller;
