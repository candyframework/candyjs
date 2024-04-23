"use strict";
const ArrayList = require("utils/ArrayList");
class AbstractSubject {
    constructor() {
        this.observers = new ArrayList();
    }
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.remove(observer);
    }
    notifyObservers() {
        for (let observer of this.observers) {
            observer.update();
        }
    }
}
module.exports = AbstractSubject;
