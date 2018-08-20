var assert = require('assert');

var CandyJs = require('../index.js');
var Controller = CandyJs.Candy.include('candy/web/Controller');


// 简单事件测试
class EventController extends Controller {
    constructor(context) {
        super(context);
        
        this.on('myevent', function() {
            EventController.eventFlag = 'simple';
        });
    }
    
    run(req, res) {
        this.trigger('myevent');
    }
}
EventController.eventFlag = '';

describe('simple-event', function() {
    it('simple', function(done) {
        new EventController().run();
        
        assert.equal(EventController.eventFlag, 'simple');
        
        done();
    });
});


// 静态行为测试
var Behavior = CandyJs.Candy.include('candy/core/Behavior');
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

class StaticBehaviorController extends Controller {
    // 重写方法
    behaviors() {
        return {
            myBehavior: new MyBehavior()
        };
    }
    
    run(req, res) {
        // 注入行为类
        this.inject();
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
        this.inject();
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
