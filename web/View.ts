/**
 * @author afu
 * @license MIT
 */
import CoreView = require('../core/View');

/**
 * web 视图
 */
class View extends CoreView {

    constructor(context: any) {
        super(context);
    }

    /**
     * @inheritdoc
     */
    renderFile(file: string, parameters: any): any {
        this.context.response.write('View must implements the renderFile() method');
        return this.context.response.end();
    }

}

export = View;
