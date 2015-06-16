var gutil = require('gulp-util');
var spawn = require('child_process').spawn;
var Promise = require("es6-promise").Promise;

module.exports = function casper(command) {
    console.log('Casper Node', command)
    return new Promise(function(resolve, reject){
        var cmd = (typeof command === 'undefined') ? 'test' : command;
        cmd = cmd ? (Array.isArray(cmd) ? cmd : cmd.split(' ')) : [];
        console.log('Casper CMD', cmd)
        var casperChild = spawn('casperjs', cmd);

        casperChild.stdout.on('data', function(data) {
            console.log('Casper data', data)
            var msg = data.toString().slice(0, -1);
            gutil.log(msg);
        });

        casperChild.on('close', function(code) {
            console.log('Casper close', code)
            var success = code === 0;
            success && resolve();
            !success && reject();
        });
    });
};