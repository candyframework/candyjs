class Ajax {
    /**
     * 输出 json 字符串
     * @param {Object} res 
     * @param {any} data 
     * @param {Number} status 
     * @param {String} msg 
     */
    static toString(res, data, status = 0, msg = '') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        const ret = {
            data: data,
            status: status,
            msg: msg
        };

        res.end(JSON.stringify(ret));
    }
}

module.exports = Ajax;