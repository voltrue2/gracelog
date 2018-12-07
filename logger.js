'use strict';

const async = require('./lib/async');
const ip = require('./lib/ip');
const msg = require('./lib/msg');
const file = require('./lib/file');
const remote = require('./lib/remote');
const Table = require('./lib/table');
const today = require('./lib/today');
const buff = require('./buffer');
const EventEmitter = require('events').EventEmitter;
const events = new EventEmitter();
// a list of logger objects for auto flush
const loggers = [];
var address = null;
// default is 5 seconds
var autoFlushInterval = 5000;
var configData;

module.exports.setup = function (config) {
    configData = config || { level: {} };
    ip.setup();
    address = ip.get();
    msg.setup(config);
    file.setup(config.level, config.file, config.oneFile);
    remote.setup(config.remote);
    today.setup(config.rotationType, config.useTimestamp);
    buff.setup(config.bufferSize);
    if (config.bufferFlushInterval) {
        autoFlushInterval = config.bufferFlushInterval;
    }
    if (!configData.remote && !configData.file) {
        return;
    }
    // auto flush log data at every x milliseconds
    module.exports._timerFlush();
};

module.exports.events = events;

module.exports.updatePrefix = function (prefix) {
    for (var i = 0, len = loggers.length; i < len; i++) {
        loggers[i].prefix = prefix;
    }
};

module.exports.create = function (prefix, name, config) {
    var logger = new Logger(prefix, name, config);
    loggers.push(logger);
    return logger;
};

module.exports.clean = function (cb) {
    var tasks = [
        module.exports.forceFlush,
        file.destroyAllStreams
    ];
    async.series(tasks, cb);
};

module.exports.forceFlush = function (cb) {
    async.each(loggers, function (logger, next) {
        logger._autoFlush(next);
    }, cb);

};

module.exports._timerFlush = function () {
    // auto flush buffered log data at x miliseconds
    // Node.js timer implementation should be effecient for handling lots of timers
    // https://github.com/joyent/node/blob/master/deps/uv/src/unix/timer.c #120
    setTimeout(function () {
        module.exports.forceFlush(module.exports._timerFlush);
    }, autoFlushInterval);
};

function Logger(prefix, name) {
    this.prefix = prefix;
    this.name = name;
    this.config = configData || {};
}

Logger.prototype.createTable = function (obj) {
    var table = new Table(obj);
    return table.get();
};

Logger.prototype.verbose = function () {
    // check enabled or not
    if (!this.config.level['verbose']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    this._handleLog.apply(this, ['verbose', messages]);
};

Logger.prototype.sys = function () {
    // check enabled or not
    if (!this.config.level['sys']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    this._handleLog.apply(this, ['sys', messages]);
};

Logger.prototype.debug = function () {
    // check enabled or not
    if (!this.config.level['debug']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    this._handleLog.apply(this, ['debug', messages]);
};

Logger.prototype.table = function () {
    // check enabled or not
    if (!this.config.level['table']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    this._handleLog.apply(this, ['table', messages]);
};

Logger.prototype.trace = function () {
    // check enabled or not
    if (!this.config.level['trace']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    var traceError = new Error('<stack trace>');
    var trace = traceError.stack.replace('Error: ', '');
    this._handleLog.apply(this, ['trace', messages]);
    this._handleLog('trace', [trace]);
};

Logger.prototype.info = function () {
    // check enabled or not
    if (!this.config.level['info']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    this._handleLog.apply(this, ['info', messages]);
};

Logger.prototype.warning = function () {
    // check enabled or not
    if (!this.config.level['warn']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    this._handleLog.apply(this, ['warn', messages]);
};

// alias of warning
Logger.prototype.warn = function () {
    // check enabled or not
    if (!this.config.level['warn']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    this._handleLog.apply(this, ['warn', messages]);
};

Logger.prototype.error = function () {
    // check enabled or not
    if (!this.config.level['error']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    this._handleLog.apply(this, ['error', messages]);
};

Logger.prototype.fatal = function () {
    // check enabled or not
    if (!this.config.level['fatal']) {
        // not enabled
        return;
    }
    var messages = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        messages.push(arguments[i]);
    }
    this._handleLog.apply(this, ['fatal', messages]);
};

Logger.prototype._handleLog = function (levelName, message) {
    // table is the same as debug
    if (levelName === 'table') {
        levelName = 'debug';
        var list = [];
        for (var i in message) {
            var table = new Table(message[i]);
            list.push(table.get());
        }
        message = list;
    }
    // if there is no config
    if (!this.config || !this.config.level) {
        // no configurations for log module at all -> fall back to console
        if (levelName === 'error' || levelName === 'fatal') {
            console.error.apply(console, message);
        }
        return;
    }

    var logMsg = msg.create(this.prefix, this.name, levelName, message);

    // if console is enabled, we output to console
    if (this.config.console) {
        switch (levelName) {
            case 'error':
            case 'fatal':
                console.error(logMsg.message);
                break;
            case 'warn':
            case 'warning':
                console.warn(logMsg.message);
                break;
            default:
                console.log(logMsg.message);
                break;
        }
    }

    // add log message to buffer. buffer will flush overflowed log message
    var bufferedMsg = buff.add(levelName, logMsg);
    if (bufferedMsg) {
        // this log level is enabled and there is flushed out log data
        this._outputLog(levelName, bufferedMsg);
    }
};

Logger.prototype._outputLog = function (levelName, bufferedMsg) {
    if (this.config.file) {
        // we pass bufferedMsg object instead of stringified bufferedMsg.messages
        // to make sure the log rotation is done accurately
        file.log(levelName, bufferedMsg);
    }
    if (this.config.remote) {
        remote.log(levelName, bufferedMsg);
    }
    var msges = bufferedMsg.filter(function (item) {
        return item.msg;
    });
    var times = bufferedMsg.filter(function (item) {
        return item.time;
    });
    events.emit('output', address, this.name, levelName, { messages: msges, timestamps: times });
};

Logger.prototype._autoFlush = function (cb) {
    // if there is no config -> we output nothing
    if (!this.config || !this.config.level) {
        return cb();
    }
    var that = this;
    var flushed = buff.flushAll();
    var list = Object.keys(flushed);
    async.each(list, function (level, callback) {
        // check enabled or not
        if (!that.config.level[level]) {
            // not enabled
            return callback();
        }
        if (!flushed[level]) {
            return callback();
        }
        var data = flushed[level];
        var fileLog = function (moveOn) {
            if (that.config.file) {
                return file.log(level, data, moveOn);
            }
            moveOn();
        };
        var remoteLog = function (moveOn) {
            if (that.config.remote) {
                return remote.log(level, data.messages.join('\n'), moveOn);
            }
            moveOn();
        };
        events.emit('output', address, that.name, level, data);
        async.series([fileLog, remoteLog], callback);
    }, cb);
};
