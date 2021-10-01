"use strict";
/**
 * @author afu
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * SQL 查询生成器抽象层
 *
 * 子类应该继承该类并实现该类的抽象方法
 */
class AbstractQuery {
    constructor() {
        /**
         * the columns being selected
         */
        this.$select = '';
        /**
         * the table to be selected from
         */
        this.$from = '';
        /**
         * the condition of a query
         */
        this.$where = '';
        /**
         * the column of group by
         */
        this.$groupBy = '';
        /**
         * the condition of a query
         */
        this.$having = '';
        /**
         * the sort condition
         */
        this.$orderBy = '';
        /**
         * other sql information
         */
        this.$options = new Map();
        /**
         * list of query parameter values
         */
        this.$parameters = [];
    }
    /**
     * Set parameters
     *
     * @param {Array} parameters
     */
    addParameters(parameters) {
        for (let name of parameters) {
            this.$parameters.push(name);
        }
    }
}
exports.default = AbstractQuery;
