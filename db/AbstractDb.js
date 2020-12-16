"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 一主多从数据库入口
 */
class AbstractDb {
    constructor(configurations) {
        this.configurations = configurations;
    }
}
exports.default = AbstractDb;
