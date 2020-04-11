class Test {
    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {id: 1, name: 'zhangsan'},
                    {id: 2, name: 'lisi'}
                ]);
            }, 10);
        });
    }
}

module.exports = Test;
