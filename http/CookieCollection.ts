/**
 * @author afu
 * @license MIT
 */

/**
 * HTTP cookies collection
 */
class CookieCollection {

    /**
     * cookies the cookies in this collection
     */
    private cookies: Map<string, string> = new Map();

    constructor() {}

    [Symbol.iterator]() {
        let index = 0;
        let keysIterator = this.cookies.keys();

        return {
            next: () => {
                if(index++ < this.cookies.size) {
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
     * 获取一条 cookie
     *
     * @param {String} name the name of the cookie
     * @param {any} defaultValue
     * @return {String}
     */
    public get(name: string, defaultValue: any = undefined): string {
        name = name.toLowerCase();

        if(this.cookies.has(name)) {
            return this.cookies.get(name);
        }

        return defaultValue;
    }

    /**
     * 添加一条 cookie 如果有重名则覆盖
     *
     * @param {String} name the name of the cookie
     * @param {String} value the value of the cookie
     */
    public set(name: string, value: string): void {
        name = name.toLowerCase();

        this.cookies.set(name, value);
    }

    /**
     * 是否存在 cookie
     *
     * @param {String} name the name of the cookie
     * @return {Boolean}
     */
    public has(name: string): boolean {
        name = name.toLowerCase();

        return this.cookies.has(name);
    }

    /**
     * 删除一条 cookie
     *
     * @param {String} name the name of the cookie
     * @return {Boolean}
     */
    public remove(name: string): boolean {
        name = name.toLowerCase();

        return this.cookies.delete(name);
    }

    /**
     * 删除所有 cookie
     */
    public clear(): void {
        this.cookies.clear();
    }

}

export = CookieCollection;
