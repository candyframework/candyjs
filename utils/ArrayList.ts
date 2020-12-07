import IList from './IList';

export = class ArrayList implements IList {
    /**
     * The size of the ArrayList
     */
    private length: number;

    /**
     * The array that stored the elements
     */
    private elementData: any[];

    /**
     * Copy array elements
     */
    static arrayCopy(src: any[], srcPos: number, dest: any[], destPos: number, length: number): void {
        let copied = 0;
        for(let i=srcPos; i<src.length; i++) {
            if(destPos < dest.length) {
                dest[destPos++] = src[i];
                copied++;
            }

            if(destPos >= dest.length || copied >= length) {
                break;
            }
        }
    }

    constructor() {
        this.length = 0;
        this.elementData = [];
    }

    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                if(index < this.length) {
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
    public size(): number {
        return this.length;
    }

    /**
     * @inheritdoc
     */
    public isEmpty(): boolean {
        return 0 === this.length;
    }

    /**
     * @inheritdoc
     */
    public contains(element: any): boolean {
        return this.indexOf(element) >= 0;
    }

    /**
     * @inheritdoc
     */
    public indexOf(element: any): number {
        for(let i=0; i<this.length; i++) {
            if(element === this.elementData[i]) {
                return i;
            }
        }

        return -1;
    }

    /**
     * @inheritdoc
     */
    public lastIndexOf(element: any): number {
        for(let i=this.length-1; i>=0; i--) {
            if(element === this.elementData[i]) {
                return i;
            }
        }

        return -1;
    }

    /**
     * @inheritdoc
     */
    public add(element: any): void {
        if(this.elementData.length > this.length) {
            this.elementData[this.length++] = element;
            return;
        }

        this.length++;
        this.elementData.push(element);
    }

    /**
     * @inheritdoc
     */
    public remove(element: any): boolean {
        let move = 0;
        for(let i=0; i<this.length; i++) {
            if(element === this.elementData[i]) {
                move = this.length - i - 1;
                if(move > 0) {
                    ArrayList.arrayCopy(this.elementData, i+1, this.elementData, i, move);
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
    public removeAt(index: number): any {
        if(index >= this.length) {
            throw new Error('removeAt is out of bounds: index=' + index + ', size=' + this.length);
        }

        let oldValue = this.elementData[index];
        let move = this.length - index - 1;
        if(move > 0) {
            ArrayList.arrayCopy(this.elementData, index+1, this.elementData, index, move);
        }
        this.elementData[--this.length] = undefined;

        return oldValue;
    }

    /**
     * @inheritdoc
     * @throws {Error}
     */
    public get(index: number): any {
        if(index >= this.length) {
            throw new Error('get is out of bounds: index=' + index + ', size=' + this.length);
        }

        return this.elementData[index];
    }

    /**
     * @inheritdoc
     * @throws {Error}
     */
    public set(index: number, element: any): any {
        if(index >= this.length) {
            throw new Error('set is out of bounds: index=' + index + ', size=' + this.length);
        }

        let oldValue = this.elementData[index];
        this.elementData[index] = element;

        return oldValue;
    }

    /**
     * @inheritdoc
     */
    public clear(): void {
        this.length = 0;
        this.elementData = [];
    }

    public toString(): string {
        let ret = '[ ';

        for(let v of this) {
            ret += v + ', '
        }
        ret = ret.substring(0, ret.lastIndexOf(', '));
        ret += ' ]';

        return ret;
    }
}
