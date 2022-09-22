/**
 * @author afu
 * @license MIT
 */
import IWebContext from './IWebContext';
import View = require('./View');

import Candy = require('../Candy');
import CoreController = require('../core/Controller');

/**
 * 控制器
 */
class Controller extends CoreController<IWebContext> {

    /**
     * 视图类
     */
    public view: View = null;

    /**
     * constructor
     */
    constructor(context: any) {
        super(context);
    }

    /**
     * 获取视图类
     */
    public getView(): View {
        if(null === this.view) {
            this.view = Candy.createObjectAsString(
                this.context.application.defaultView,
                this.context
            );
        }

        return this.view;
    }

    /**
     * 设置视图类
     *
     * @param {any} view
     */
    public setView(view: View): void {
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
