/**
 * @author afu
 * @license MIT
 */
import IComponent from './IComponent';

/**
 * 行为接口
 */
export default interface IBehavior {
    /**
     * 声明要监听的组件的事件和对应事件的处理程序
     *
     * ```
     * [
     *      ['eventName', handler]
     * ]
     * ```
     *
     * @return {any[]}
     */
    events(): any[];

    /**
     * 监听组件的事件
     *
     * @param {IComponent} component 组件
     */
    listen(component: IComponent): void;

    /**
     * 取消监听组件的事件
     */
    unListen(): void;
}
