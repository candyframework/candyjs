/**
 * @author afu
 * @license MIT
 */
import Event = require('./Event');

/**
 * 控制器动作事件
 */
class ActionEvent extends Event {

    /**
     * http request
     */
    public request: any = null;

    /**
     * http response
     */
    public response: any = null;

    /**
     * 数据
     */
    public data: any = null;

    /**
     * 状态
     */
    public valid: boolean = true;

    constructor() {
        super();
    }

}

export = ActionEvent;
