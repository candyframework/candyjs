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
     * @property {any} request
     */
    public request: any;

    /**
     * @property {any} response
     */
    public response: any;

    /**
     * @property {any} data
     */
    public data: any;

    /**
     * @property {Boolean} 状态
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
