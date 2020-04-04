const assert = require('assert');

const Candy = require('../Candy');
const Controller = Candy.include('candy/web/Controller');


// 简单事件测试
class EventController extends Controller {
    constructor(context) {
        super(context);

        this.on('myevent', function(data) {
            EventController.eventFlag = data;
        });
    }

    run(req, res) {
        this.trigger('myevent', 'this is data');
    }
}
EventController.eventFlag = '';

describe('simple-event', function() {
    it('simple', function(done) {
        new EventController().run();

        assert.equal(EventController.eventFlag, 'this is data');

        done();
    });
});


const Behavior = Candy.include('candy/core/Behavior');
class MyBehavior extends Behavior {
    constructor() {
        super();

        this.props1 = 1;
        this.props2 = 2;
    }

    myFun() {
        return 'behavior_fun';
    }
}


// 静态行为测试
class StaticBehaviorController extends Controller {
    // 重写方法
    behaviors() {
        return {
            myBehavior: new MyBehavior()
        };
    }

    run(req, res) {
        // 注入行为类
        this.injectBehaviors();
    }
}

describe('static-behavior', function() {
    it('injectedBehavior', function(done) {
        var b = new StaticBehaviorController();
        b.run();

        var p1 = b.props1;
        var p2 = b.props2;
        var str = b.myFun();

        assert.equal(p1, 1);
        assert.equal(p2, 2);
        assert.equal(str, 'behavior_fun');

        done();
    });
});


// 动态行为测试
class DynamicBehaviorController extends Controller {
    constructor() {
        super();

        // 附加组件
        this.attachBehavior('myBehavior', new MyBehavior());
    }

    run(req, res) {
        // 注入行为类
        this.injectBehaviors();
    }
}

describe('dynamic-behavior', function() {
    it('injectedBehavior', function(done) {
        var b = new DynamicBehaviorController();
        b.run();

        var p1 = b.props1;
        var p2 = b.props2;
        var str = b.myFun();

        assert.equal(p1, 1);
        assert.equal(p2, 2);
        assert.equal(str, 'behavior_fun');

        done();
    });
});
