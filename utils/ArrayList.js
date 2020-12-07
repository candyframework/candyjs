"use strict";
module.exports = class ArrayList {
    constructor() {
        this.length = 0;
        this.elementData = [];
    }
    /**
     * Copy array elements
     */
    static arrayCopy(src, srcPos, dest, destPos, length) {
        let copied = 0;
        for (let i = srcPos; i < src.length; i++) {
            if (destPos < dest.length) {
                dest[destPos++] = src[i];
                copied++;
            }
            if (destPos >= dest.length || copied >= length) {
                break;
            }
        }
    }
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.length) {
                    let ret = { value: this.elementData[index], done: false };
                    index++;
                    return ret;
                }
                return { value: undefined, done: true };
            }
        };
    }
    /**
     * @inheritdoc
     */
    size() {
        return this.length;
    }
    /**
     * @inheritdoc
     */
    isEmpty() {
        return 0 === this.length;
    }
    /**
     * @inheritdoc
     */
    contains(element) {
        return this.indexOf(element) >= 0;
    }
    /**
     * @inheritdoc
     */
    indexOf(element) {
        for (let i = 0; i < this.length; i++) {
            if (element === this.elementData[i]) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @inheritdoc
     */
    lastIndexOf(element) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (element === this.elementData[i]) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @inheritdoc
     */
    add(element) {
        if (this.elementData.length > this.length) {
            this.elementData[this.length++] = element;
            return;
        }
        this.length++;
        this.elementData.push(element);
    }
    /**
     * @inheritdoc
     */
    remove(element) {
        let move = 0;
        for (let i = 0; i < this.length; i++) {
            if (element === this.elementData[i]) {
                move = this.length - i - 1;
                if (move > 0) {
                    ArrayList.arrayCopy(this.elementData, i + 1, this.elementData, i, move);
                }
                this.elementData[--this.length] = undefined;
                return true;
            }
        }
        return false;
    }
    /**
     * @inheritdoc
     * @throws {Error}
     */
    removeAt(index) {
        if (index >= this.length) {
            throw new Error('removeAt is out of bounds: index=' + index + ', size=' + this.length);
        }
        let oldValue = this.elementData[index];
        let move = this.length - index - 1;
        if (move > 0) {
            ArrayList.arrayCopy(this.elementData, index + 1, this.elementData, index, move);
        }
        this.elementData[--this.length] = undefined;
        return oldValue;
    }
    /**
     * @inheritdoc
     * @throws {Error}
     */
    get(index) {
        if (index >= this.length) {
            throw new Error('get is out of bounds: index=' + index + ', size=' + this.length);
        }
        return this.elementData[index];
    }
    /**
     * @inheritdoc
     * @throws {Error}
     */
    set(index, element) {
        if (index >= this.length) {
            throw new Error('set is out of bounds: index=' + index + ', size=' + this.length);
        }
        let oldValue = this.elementData[index];
        this.elementData[index] = element;
        return oldValue;
    }
    /**
     * @inheritdoc
     */
    clear() {
        this.length = 0;
        this.elementData = [];
    }
    toString() {
        let ret = '[';
        for (let v of this) {
            ret += v + ', ';
        }
        ret = ret.substring(0, ret.lastIndexOf(', '));
        ret += ']';
        return ret;
    }
};
