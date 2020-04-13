/**
 * 模拟读取数据库
 */
const data = [
    {id: 1, name: 'zhangsan', gender: 1, age: 20},
    {id: 2, name: 'lisi', gender: 1, age: 22},
    {id: 3, name: 'xiaohong', gender: 0, age: 18}
];

class User {
    getUserList() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data);
            }, 20);
        });
    }
    
    getUserById(id) {
        return new Promise((resolve, reject) => {
            const list = data;
            let ret = null;
            
            for(let i=0, len=list.length; i<len; i++) {
                if(id === list[i].id) {
                    ret = list[i];
                    break;
                }
            }
            
            resolve(ret);
        });
        
    }
}

module.exports = User;
