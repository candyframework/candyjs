/**
 * 分页 sql 生成工具
 */
class Sql {
    static buildSelectSql(table, fields, where, filterRows, pageSize) {
        let ret = 'SELECT ' + fields + ' FROM ' + table
        + ' WHERE ' + where + ' AND id <=('
            + 'SELECT id FROM '+ table + ' WHERE '+ where
            + ' ORDER BY id DESC LIMIT '+ filterRows +', 1)'
        +' ORDER BY id DESC LIMIT '+ pageSize;

        return ret;
    }
}

module.exports = Sql;
