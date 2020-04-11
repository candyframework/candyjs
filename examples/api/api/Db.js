class Db {

    static getById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    id: id,
                    content: 'this is the post content of id' + id
                });
            }, 1000);
        });
    }

}

module.exports = Db;
