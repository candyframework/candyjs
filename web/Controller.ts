/**
 * @author afu
 * @license MIT
 */
import Candy = require('../Candy');
import CoreController = require('../core/Controller');

/**
 * 控制器
 */
class Controller extends CoreController {

    /**
     * 视图类
     */
    public view: any = null;

    /**
     * constructor
     */
    constructor(context: any) {
        super(context);
    }

    /**
     * 获取视图类
     *
     * @typedef {import('./View')} View
     * @return {View}
     */
    public getView(): any {
        if(null === this.view) {
            this.view = Candy.createObjectAsString(Candy.app.defaultView, this.context);
        }

        return this.view;
    }

    /**
     * 设置视图类
     *
     * @param {any} view
     */
    public setView(view: any): void {
        this.view = view;
    }

    /**
     * @inheritdoc
     */
    public run(request: any, response: any): void {
        response.write('Controller must implements the run() method');
        response.end();
    }

    /**
     * @inheritdoc
     */
    public render(view: string, parameters: any = null): any {
        return this.getView().render(view, parameters);
    }

}

export = Controller;
