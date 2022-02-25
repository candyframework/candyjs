export default interface IEvent {
    on(eventName: string, handler: any): void;

    off(eventName: string, handler: any): void;

    offAll(): void;

    trigger(eventName: string, parameter: any): void;
}
