import ArrayList = require('./ArrayList');

/**
 * Stack
 */
export = class Stack extends ArrayList {
    /**
     * Push an item onto the top of this stack
     *
     * @param {any} item
     */
    push(item: any): void {
        this.add(item);
    }

    /**
     * Removes the object at the top of this stack and returns it
     *
     * @throws {Error}
     */
    pop(): any {
        let len = this.size();

        return this.removeAt(len - 1);
    }

    /**
     * Tests if this stack is empty
     */
    empty(): boolean {
        return 0 === this.size();
    }
}
