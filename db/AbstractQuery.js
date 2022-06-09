"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractQuery {
    constructor() {
        this.$select = '';
        this.$from = '';
        this.$where = '';
        this.$groupBy = '';
        this.$having = '';
        this.$orderBy = '';
        this.$parameters = [];
    }
    addParameters(parameters) {
        for (let name of parameters) {
            this.$parameters.push(name);
        }
    }
}
exports.default = AbstractQuery;
