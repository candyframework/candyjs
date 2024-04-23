/**
 * @author afu
 * @license MIT
 */
import IObserver from './IObserver';
import ArrayList = require('utils/ArrayList');

/**
 * 被观察者
 */
abstract class AbstractSubject {
    protected observers = new ArrayList<IObserver>();

    /**
     * Add an observer
     */
    public addObserver(observer: IObserver): void {
        this.observers.add(observer);
    }

    /**
     * Remove an observer
     */
    public removeObserver(observer: IObserver): void {
        this.observers.remove(observer);
    }

    /**
     * Notify observers
     */
    public notifyObservers(): void {
        for(let observer of this.observers) {
            observer.update();
        }
    }
}

export = AbstractSubject;
