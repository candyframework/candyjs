"use strict";
class StringHelper {
    static frequency(content, find) {
        let num = 0;
        let x = content.indexOf(find);
        while (-1 !== x) {
            num++;
            x = content.indexOf(find, x + 1);
        }
        return num;
    }
    static nIndexOf(str, find, n) {
        let x = str.indexOf(find);
        for (let i = 1; i < n; i++) {
            x = str.indexOf(find, x + 1);
        }
        return x;
    }
    static trimChar(str, character) {
        if (character === str.charAt(0)) {
            str = str.substring(1);
        }
        if (character === str.charAt(str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }
        return str;
    }
    static lTrimChar(str, character) {
        if (character === str.charAt(0)) {
            str = str.substring(1);
        }
        return str;
    }
    static rTrimChar(str, character) {
        if (character === str.charAt(str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }
        return str;
    }
    static ucFirst(str) {
        let ret = str.charAt(0).toUpperCase();
        return ret + str.substring(1);
    }
    static htmlSpecialChars(str, flag = 2, doubleEncode = false) {
        if (doubleEncode) {
            str = str.replace(/&/g, '&amp;');
        }
        str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        if (0 === flag) {
            str = str.replace(/'/g, '&#039;').replace(/"/g, '&quot;');
        }
        else if (1 === flag) {
            str = str.replace(/'/g, '&#039;');
        }
        else if (2 === flag) {
            str = str.replace(/"/g, '&quot;');
        }
        return str;
    }
    static filterTags(str, allowed = '') {
        let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
        let comments = /<!--[\s\S]*?-->/gi;
        str = str.replace(comments, '');
        if ('' === allowed) {
            return str.replace(tags, '');
        }
        allowed = allowed.toLowerCase();
        return str.replace(tags, (match, p) => {
            return allowed.indexOf('<' + p.toLowerCase() + '>') !== -1 ? match : '';
        });
    }
}
module.exports = StringHelper;
