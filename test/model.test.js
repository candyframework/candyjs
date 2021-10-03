const request = require('supertest');
const assert = require('assert');
const Model = require('../model/Model');
const Validator = require('../model/Validator');

// mock data
const mockRequest = {
    body: {
        user_name: 'zhang san',
        age: 10,
        school: '233 school'
    }
};
const mockRequest2 = {
    body: {
        user_name: '',
        age: 209,
        school: ''
    }
};

// 定义业务模型
class UserModel extends Model {
    constructor() {
        super();

        this.attributes = {
            name: '',
            age: 0,
            school: ''
        };

        this.attributesMap = {
            name: 'user_name'
        };
    }

    rules() {
        return [
            {
                rule: 'candy/model/RequiredValidator',
                attributes: ['name', 'school'],
                messages: ['用户名不能为空']
            },
            {
                rule: new MyNumberValidator(),
                attributes: ['age'],
                messages: ['年龄不合法']
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
describe('Fill model', function() {
    it('fill data test', function(done) {
        const m = new UserModel();
        m.fill(mockRequest);

        assert.equal(m.getAttribute('name'), 'zhang san');
        assert.equal(m.getAttribute('age'), 10);
        assert.equal(m.getAttribute('school'), '233 school');

        done();
    });

    it('full data validate test', function(done) {
        const m = new UserModel();
        m.fill(mockRequest);

        let rs = m.validate();
        assert.equal(rs, true);
        assert.equal(m.getErrors().length, 0);

        done();
    });

    it('part of data validate test', function(done) {
        const m = new UserModel();
        m.fill(mockRequest2);

        let rs = m.validate();
        assert.equal(rs, false);
        assert.equal(m.getErrors()[0], '用户名不能为空');
        assert.equal(m.getErrors()[1], 'school is required');
        assert.equal(m.getErrors()[2], '年龄不合法');

        done();
    });
});

