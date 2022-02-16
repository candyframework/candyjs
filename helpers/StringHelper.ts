/**
 * @author afu
 * @license MIT
 */

/**
 * String Helper
 */
class StringHelper {

    /**
     * 查找子字符串出现的次数
     *
     * @param {String} content
     * @param {String} find
     * @return {Number}
     */
    static frequency(content: string, find: string): number {
        let num = 0;
        let x = content.indexOf(find);
        while(-1 !== x) {
            num++;
            x = content.indexOf(find, x + 1);
        }

        return num;
    }

    /**
     * 查找某字符串在另一个字符串中第 N 次出现的位置
     *
     * @param {String} str 待查找的字符串
     * @param {String} find 要查找的字符串
     * @param {Number} n 第几次出现
     * @return {Number} 位置值
     */
    static nIndexOf(str: string, find: string, n: number): number {
        let x = str.indexOf(find);
        for(let i = 1; i < n; i++) {
            x = str.indexOf(find, x + 1);
        }

        return x;
    }

    /**
     * 删除两端字符
     *
     * @param {String} str 待处理的字符串
     * @param {String} character 要删除的字符
     * @return {String} 处理后的字符串
     */
    static trimChar(str: string, character: string): string {
        if(character === str.charAt(0)) {
            str = str.substring(1);
        }
        if(character === str.charAt(str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }

        return str;
    }

    /**
     * 删除左侧字符
     *
     * @param {String} str 待处理的字符串
     * @param {String} character 要删除的字符
     * @return {String} 处理后的字符串
     */
    static lTrimChar(str: string, character: string): string {
        if(character === str.charAt(0)) {
            str = str.substring(1);
        }

        return str;
    }

    /**
     * 删除右侧字符
     *
     * @param {String} str 待处理的字符串
     * @param {String} character 要删除的字符
     * @return {String} 处理后的字符串
     */
    static rTrimChar(str: string, character: string): string {
        if(character === str.charAt(str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }

        return str;
    }

    /**
     * 首字母大写
     *
     * @param {String} str 待处理的字符串
     * @return {String} 处理后的字符串
     */
    static ucFirst(str: string): string {
        let ret = str.charAt(0).toUpperCase();

        return ret + str.substring(1);
    }

    /**
     * 转化特殊 html 字符到实体
     *
     * @param {String} str 待处理的字符串
     * @param {Number} flag 转义规则
     * @param {Boolean} doubleEncode 转义 & 符号
     * @return {String} 处理后的字符串
     */
    static htmlSpecialChars(str: string, flag: number = 2, doubleEncode: boolean = false): string {
        // 放到最前面 防止多次转义
        if(doubleEncode) {
            str = str.replace(/&/g, '&amp;');
        }

        str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        if(0 === flag) {
            str = str.replace(/'/g, '&#039;').replace(/"/g, '&quot;');

        } else if(1 === flag) {
            str = str.replace(/'/g, '&#039;');

        } else if(2 === flag) {
            str = str.replace(/"/g, '&quot;');
        }

        return str;
    }

    /**
     * 过滤 html 标签
     *
     * ```
     * eg.
     * filterTags('<a>abc</a>xyz') -> abcxyz
     * filterTags('<a>abc</a>xyz', '<a><b>') -> <a>abc</a>xyz
     * ```
     *
     * @param {String} str
     * @param {String} allowed
     * @return {String}
     */
    static filterTags(str: string, allowed: string = ''): string {
        let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
        let comments = /<!--[\s\S]*?-->/gi;

        str = str.replace(comments, '');

        if('' === allowed) {
            return str.replace(tags, '');
        }

        allowed = allowed.toLowerCase();

        // match 为匹配到的内容  p 为第一个子模式
        return str.replace(tags, (match, p) => {
            return allowed.indexOf('<' + p.toLowerCase() + '>') !== -1 ? match : '';
        });
    }

}

export = StringHelper;
