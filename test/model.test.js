const request = require('supertest');
const assert = require('assert');
const Model = require('../model/Model');
const Validator = require('../model/Validator');

// mock data
const mockRequest = {
    body: {
        user_name: 'zhang san',
        age: 20,
        school: 'abc school',
        email: 'afu@afu.com',
        password: '123456',
        confirming: '123456'
    }
};
const mockRequest2 = {
    body: {
        user_name: 'zhang san',
        age: 20,
        school: 'abc school',
        email: 'afu@afu.com',
        password: '123456',
        confirming: '123'
    }
};

// 定义业务模型
class UserModel extends Model {
    constructor() {
        super();

        this.attributes = {
            name: '',
            age: 0,
            school: '',
            email: '',
            password: '',
            confirming: ''
        };

        this.attributesMap = {
            name: 'user_name'
        };
    }

    rules() {
        return [
            {
                rule: 'candy/model/validators/RequiredValidator',
                attributes: ['name', 'school'],
                messages: ['用户名不能为空']
            },
            {
                rule: new MyNumberValidator(),
                attributes: ['age'],
                messages: ['年龄不合法']
            },
            {
                rule: 'candy/model/validators/EqualValidator',
                attributes: ['password', 'confirming'],
                messages: ['两次密码不一致']
            },
            {
                rule: 'candy/model/validators/EmailValidator',
                attributes: ['email']
            }
        ];
    }
}

class MyNumberValidator extends Validator {
    constructor() {
        super();

        this.max = 100;
        this.min = 1;
    }

    validate(attributeName, attributeValue) {
        let info = this.getMessage(attributeName);

        if(attributeValue < this.min || attributeValue > this.max) {
            return '' === info ? 'age is invalid' : info;
        }

        return '';
    }
}


// 测试
describe('Model', () => {
    it('#fill() test', (done) => {
        const m = new UserModel();
        m.fill(mockRequest);

        assert.equal(m.getAttribute('name'), 'zhang san');
        assert.equal(m.getAttribute('age'), 20);
        assert.equal(m.getAttribute('school'), 'abc school');

        done();
    });

    it('valid data test', (done) => {
        const m = new UserModel();
        m.fill(mockRequest);

        let rs = m.validate();
        assert.equal(rs, true);
        assert.equal(m.getErrors().length, 0);

        done();
    });

    it('invalid data test', (done) => {
        const m = new UserModel();
        m.fill(mockRequest2);

        let rs = m.validate();
        assert.equal(rs, false);
        assert.equal(m.getFirstError(), '两次密码不一致');

        done();
    });
});
