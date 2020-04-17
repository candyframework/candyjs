const RegExpRouter = require('../utils/RegExpRouter');

const routes = [
    {route: '/home', handler: (req, res) => {console.log('home')}},
    {route: '/user/{uid}', handler: (req, res, params) => {console.log(params)}}
];

const reg = new RegExpRouter(routes);
reg.combineRoutes();

const ret = reg.exec('/user/1');

console.log(ret);