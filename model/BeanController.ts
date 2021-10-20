/**
 * @author afu
 * @license MIT
 */
import Candy = require('../Candy');
import Controller = require('../web/Controller');

/**
 * Bean
 */
class BeanController extends Controller {

    constructor(context: any) {
        super(context);
    }

    /**
     * 需要装配的模型
     *
     * ```
     * [
     *      'app/models/XxxModel',
     *      {
     *          classPath: 'app/models/XxxModel'
     *      }
     * ]
     * ```
     *
     */
    public autowire(): any[] {
        return null;
    }

    public generateName(name: string): string {
        let ret = name.charAt(0).toLowerCase();

        return ret + name.substring(1);
    }

    private wire(): void {
        let beans = this.autowire();
        if(null === beans) {
            return;
        }

        for(let i=0, bean=null, name=''; i<beans.length; i++) {
            // model is string
            if('string' === typeof beans[i]) {
                bean = Candy.createObjectAsString(beans[i]);

            } else {
                // model is config
                bean = Candy.createObjectAsDefinition(beans[i]);
            }

            bean.fill(this.context.request);
            name = '' === bean.modelName ? this.generateName(bean.className()) : bean.modelName;
            this[name] = bean;
        }
    }

    /**
     * @override
     */
    public runControllerAction(request: any, response: any): void {
        this.wire();

        super.runControllerAction(request, response);
    }

}

export = BeanController;
