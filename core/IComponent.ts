import IEvent from "./IEvent";

export default interface IComponent extends IEvent {
    className(): string;

    behaviors(): any[];

    attachBehavior(name: string, behavior: any): void;

    attachBehaviors(behaviors: any[]): void;

    detachBehavior(name: string): any;

    detachBehaviors(): void;
}
