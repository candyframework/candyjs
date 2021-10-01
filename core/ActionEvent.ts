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
    public request: any;

    /**
     * http response
     */
    public response: any;

    /**
     * 数据
     */
    public data: any;

    /**
     * 状态
     */
    public valid: boolean;

    constructor() {
        super();

        this.request = null;
        this.response = null;
        this.data = null;
        this.valid = true;
    }

}

export = ActionEvent;
