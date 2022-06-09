"use strict";
class TimeHelper {
    static stringLPad(str, pad, length) {
        while (str.length < length) {
            str = pad + str;
        }
        return str;
    }
    static stringRPad(str, pad, length) {
        while (str.length < length) {
            str = str + pad;
        }
        return str;
    }
    static format(formats, timestamp = Date.now()) {
        let d = new Date(timestamp);
        let funs = {
            y: () => d.getFullYear(),
            m: () => TimeHelper.stringLPad(String(d.getMonth() + 1), '0', 2),
            d: () => TimeHelper.stringLPad(String(d.getDate()), '0', 2),
            h: () => TimeHelper.stringLPad(String(d.getHours()), '0', 2),
            i: () => TimeHelper.stringLPad(String(d.getMinutes()), '0', 2),
            s: () => TimeHelper.stringLPad(String(d.getSeconds()), '0', 2)
        };
        return formats.replace(/(.?)/ig, (match, p) => {
            return undefined !== funs[match] ?
                funs[match]() :
                p;
        });
    }
}
module.exports = TimeHelper;
