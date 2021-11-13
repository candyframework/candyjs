"use strict";
/**
 * ArrayList
 */
class ArrayList {
    constructor() {
        /**
         * The size of the List
         */
        this.length = 0;
        /**
         * The array that stored the elements
         */
        this.elementData = [];
    }
    /**
     * 将源数组拷贝到目标数组
     *
     * @param {any[]} src 源数组
     * @param {Number} srcPos 源数组开始位置
     * @param {any[]} dest 目标数组
     * @param {Number} destPos 目标数组开始位置
     * @param {Number} length 拷贝数量
     */
    static arrayCopy(src, srcPos, dest, destPos, length) {
        let copied = 0;
        let expand = destPos + length - dest.length;
        let tmp = null;
        if (expand > 0) {
            tmp = new Array(expand);
            for (let i = 0; i < tmp.length; i++) {
                tmp[i] = undefined;
            }
            dest.push.apply(dest, tmp);
        }
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
     * Returns the number of elements in this list
     */
    size() {
        return this.length;
    }
    /**
     * Returns true if this list contains no elements
     */
    isEmpty() {
        return 0 === this.length;
    }
    /**
     * Returns true if this list contains the specified element
     *
     * @param {any} element
     */
    contains(element) {
        return this.indexOf(element) >= 0;
    }
    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {any} element
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
     * Returns the index of the last occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {any} element
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
     * Appends the specified element to the end of this list
     *
     * @param {any} element
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
     * Inserts the specified element at the specified position
     *
     * @param {Number} index
     * @param {any} element
     */
    insert(index, element) {
        if (index > this.length) {
            return false;
        }
        ArrayList.arrayCopy(this.elementData, index, this.elementData, index + 1, this.length - index);
        this.length++;
        this.elementData[index] = element;
        return true;
    }
    /**
     * Removes the first occurrence of the specified element from this list
     *
     * @param {any} element
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
     * Removes the element at the specified position in this list
     *
     * @param {Number} index
     */
    removeAt(index) {
        if (index >= this.length) {
            return null;
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
     * Returns the element at the specified position in this list
     *
     * @param {Number} index
     */
    get(index) {
        if (index >= this.length) {
            return null;
        }
        return this.elementData[index];
    }
    /**
     * Replaces the element in the list with the specified element
     *
     * @param {Number} index
     * @param {any} element
     */
    set(index, element) {
        if (index >= this.length) {
            return null;
        }
        let oldValue = this.elementData[index];
        this.elementData[index] = element;
        return oldValue;
    }
    /**
     * Removes all of the elements from this list
     */
    clear() {
        this.length = 0;
        this.elementData = [];
    }
    toString() {
        let ret = '[ ';
        for (let v of this) {
            ret += v + ', ';
        }
        ret = ret.substring(0, ret.lastIndexOf(', '));
        ret += ' ]';
        return ret;
    }
}
module.exports = ArrayList;
