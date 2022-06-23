/**
 * @author afu
 * @license MIT
 */
import IBehavior from './IBehavior';
import IComponent from './IComponent';

/**
 * 行为类
 *
 * 行为类能够监听组件的事件并作出响应
 */
class Behavior implements IBehavior {

    /**
     * 行为持有的组件
     */
    public component: IComponent = null;

    constructor() {}

    /**
     * @inheritdoc
     */
    public events(): any[] {
        return null;
    }

    /**
     * @inheritdoc
     */
    public listen(component: IComponent): void {
        this.component = component;

        let events = this.events();
        if(null === events) {
            return;
        }

        for(let v of events) {
            this.component.on(v[0], v[1]);
        }
    }

    /**
     * @inheritdoc
     */
    public unListen(): void {
        if(null === this.component) {
            return;
        }

        let events = this.events();
        if(null === events) {
            return;
        }

        for(let v of events) {
            this.component.off(v[0], v[1]);
        }

        this.component = null;
    }

}

export = Behavior;
