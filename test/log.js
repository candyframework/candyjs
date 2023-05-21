const Log = require('../log/file/DailyRotateLog');

const log = new Log();
log.logPath = '.';

let i=0;
while(i++ < 400) {
    log.flush([ [ 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa', 4, Date.now() ] ])
}
