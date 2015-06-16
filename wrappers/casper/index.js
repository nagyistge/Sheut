var gutil = require('gulp-util');
var Promise = require('es6-promise').Promise;
var child_process = require('child_process');

function execPromise(cmd, args){
    return new Promise(function(resolve, reject){
        child_process.exec(cmd + ' ' + args.join(' '),
            function (error, stdout, stderr) {
                stdout && console.log(stdout);
                stderr && console.log(stderr);
                if (error !== null) {
                    reject( cmd + ' ' + args[0] + ' Error: ' + error);
                } else {
                    resolve(cmd + ' ' + args[0] + ' Complete');
                }
            });
    });
}

module.exports = function casper(command) {
    console.log('Casper Node', command)
    return execPromise('casperjs', command);
};
