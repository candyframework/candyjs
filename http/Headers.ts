/**
 * @author afu
 * @license MIT
 */

/**
 * HTTP headers collection
 */
class Headers {

    /**
     * headers the headers in this collection
     *
     * header 头可能重复出现 所以这里以数组形式保存
     */
    public headers: Map<String, String[]> = new Map();

    constructor() {}

    [Symbol.iterator]() {
        let index = 0;
        let keysIterator = this.headers.keys();

        return {
            next: () => {
                if(index++ < this.headers.size) {
                    let key = keysIterator.next().value;

                    return {
                        value: [key, this.get(key)],
                        done: false
                    };
                }

                return {value: undefined, done: true};
            }
        }
    }

    /**
     * 获取一条 header
     *
     * @param {String} name the name of the header
     * @param {any} defaultValue
     * @return {String}
     */
    public get(name: string, defaultValue: any = undefined): string {
        name = name.toLowerCase();

        if(this.headers.has(name)) {
            return this.headers.get(name).join(', ');
        }

        return defaultValue;
    }

    /**
     * 添加一条 header 如果有重名则覆盖
     *
     * @param {String} name the name of the header
     * @param {String} value the value of the header
     */
    public set(name: string, value: string): void {
        name = name.toLowerCase();

        this.headers.set(name, [value]);
    }

    /**
     * 添加一条 header 如果有重名则追加
     *
     * @param {String} name the name of the header
     * @param {String} value the value of the header
     */
    public add(name: string, value: string): void {
        name = name.toLowerCase();

        if(this.headers.has(name)) {
            this.headers.get(name).push(value);
            return;
        }

        this.headers.set(name, [value]);
    }

    /**
     * 是否存在 header
     *
     * @param {String} name the name of the header
     * @return {Boolean}
     */
    public has(name: string): boolean {
        return this.headers.has(name);
    }

    /**
     * 删除一条 header
     *
     * @param {String} name the name of the header
     * @return {Boolean}
     */
    public remove(name: string): boolean {
        name = name.toLowerCase();

        return this.headers.delete(name);
    }

    /**
     * 删除所有 header
     */
    public clear(): void {
        this.headers.clear();
    }

}

export = Headers;
