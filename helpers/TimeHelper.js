/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 时间工具
 */
class TimeHelper {
    
    /**
     * 字符串左侧填充
     *
     * @param {String} str 待处理字符串
     * @param {String} pad 填充字符
     * @param {Number} length 处理后字符串长度
     * @return {String} 处理后的字符串
     */
    static stringLPad(str, pad, length) {
        while(str.length < length) {
            str = pad + str;
        }
        
        return str;
    }
    
    /**
     * 字符串右侧填充
     *
     * @param {String} str 待处理字符串
     * @param {String} pad 填充字符
     * @param {Number} length 处理后字符串长度
     * @return {String} 处理后的字符串
     */
    static stringRPad(str, pad, length) {
        while(str.length < length) {
            str = str + pad;
        }
        
        return str;
    }
    
    /**
     * 格式化时间
     *
     * @param {String} formats 格式化参数
     * @param {Number} timestamp 时间戳
     *
     * 用法
     * var str = TimeHelper.format('y-m-d h:i:s');
     *
     * @return {String}
     */
    static format(formats, timestamp) {
        var d = undefined === timestamp ? new Date() : new Date(timestamp);
        var funs = {
            y: () => d.getFullYear()
            ,m: () => TimeHelper.stringLPad(String(d.getMonth() + 1), '0', 2)
            ,d: () => TimeHelper.stringLPad(String(d.getDate()), '0', 2)
            ,h: () => TimeHelper.stringLPad(String(d.getHours()), '0', 2)
            ,i: () => TimeHelper.stringLPad(String(d.getMinutes()), '0', 2)
            ,s: () => TimeHelper.stringLPad(String(d.getSeconds()), '0', 2)
        };
        
        return formats.replace(/(.?)/ig, (match, p/* , offset, string */) => {
            return undefined !== funs[match] ?
                funs[match]() :
                p;
        });
    }
    
}

module.exports = TimeHelper;
