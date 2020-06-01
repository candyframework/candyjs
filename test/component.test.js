const assert = require('assert');

const Controller = require('../web/Controller');


// 简单事件测试
class EventController extends Controller {
    constructor(context) {
        super(context);

        this.on('myevent', (data) => {
            EventController.eventFlag = data;

            // 移除
            this.offAll();
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


// 行为类
const Behavior = require('../core/Behavior');
class MyBehavior extends Behavior {
    constructor() {
        super();
    }

    // 监听 customEvent 事件
    events() {
        return [
            ['customEvent', (e) => {
                e.result = 'data processed by behavior';
            }],
            ['customEvent2', (e) => {
                e.result += '--process2';
            }]
        ];
    }
}


// 静态行为测试
class StaticBehaviorController extends Controller {
    constructor(context) {
        super(context);
    }

    // 重写方法
    behaviors() {
        return [
            ['myBehavior', new MyBehavior()]
        ];
    }

    run() {
        let data = {result: ''};
        this.trigger('customEvent', data);

        this.detachBehavior('myBehavior');
        return data.result;
    }
}

describe('static-behavior', function() {
    it('injectedBehavior', function(done) {
        let b = new StaticBehaviorController();
        let rs = b.run();
        assert.equal(rs, 'data processed by behavior');

        done();
    });
});


// 动态行为测试
class DynamicBehaviorController extends Controller {
    constructor(context) {
        super(context);

        // 动态附加行为 行为里面会监听 customEvent 事件
        this.attachBehavior('myBehavior', new MyBehavior());
    }

    run() {
        let data = {result: ''};
        this.trigger('customEvent', data);
        this.trigger('customEvent2', data);

        this.detachBehavior('myBehavior');
        return data.result;
    }
}

describe('dynamic-behavior', function() {
    it('injectedBehavior', function(done) {
        let b = new DynamicBehaviorController();
        let rs = b.run();
        assert.equal(rs, 'data processed by behavior--process2');

        done();
    });
});
