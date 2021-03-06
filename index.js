'use strict';

var loggerSource = require('./logger');
var DEFAULT_CONF = {
    console: true,
    color: true,
    level: '>= verbose'
};

var configData = null;
var prefix = '';
var appPrefix = '';

module.exports.on = function (eventName, cb) {
    loggerSource.events.on(eventName, cb);
};

module.exports.once = function (eventName, cb) {
    loggerSource.events.once(eventName, cb);
};

module.exports.removeListener = function (eventName, cb) {
    return loggerSource.events.removeListener(eventName, cb);
};

module.exports.removeAll = function (eventName) {
    loggerSource.events.removeAll(eventName);
};

module.exports.hasListener = function (eventName) {
    return loggerSource.events.hasListener(eventName);
};


module.exports.config = function (configIn) {

    configData = configIn;

    // there is no configurations, we create a default one
    if (!configData) {
        configData = DEFAULT_CONF;
    }

    // if config console is missing, we create it and set it to true as a default
    if (configData.console === undefined && !configData.file && !configData.remote) {
        configData.console = true;
    }

    // if config level is missing, we create a default one
    if (!configData.level) {
        configData.level = '>= verbose';
    }

    if (configData.level && typeof configData.level === 'string') {
        // for backward compatibility:
        if (configData.level.indexOf('warning') !== -1) {
            configData.level = configData.level.replace('warning', 'warn');
        }
        // we now support a string format of level
        // e.i. "level": ">= info"
        var sep = configData.level.split(' ');
        var operators = ['>', '<', '>=', '<=', '='];
        var levels = [
            'verbose',
            'sys',
            'debug',
            'trace',
            'info',
            'warn',
            'error',
            'fatal'
        ];
        var level = {};
        var op = null;
        var lvl = null;
        for (var k = 0, ken = sep.length; k < ken; k++) {
            if (operators.indexOf(sep[k]) !== -1) {
                op = sep[k];
            } else if (levels.indexOf(sep[k]) !== -1) {
                lvl = sep[k];
            }
        }
        if (lvl) {
            if (op) {
                if (op.indexOf('<') !== -1) {
                    levels.reverse();
                }
                var start = levels.indexOf(lvl);
                if (op.indexOf('=') === -1) {
                    start += 1;
                }
                for (var j = start, jen = levels.length; j < jen; j++) {
                    level[levels[j]] = true;
                }
            } else {
                level[lvl] = true;
            }
        }
        configData.level = level;

    } else if (configData.level && Array.isArray(configData.level)) {
        // we now support an array format of level
        var levelObj = {};
        for (var i = 0, len = configData.level.length; i < len; i++) {
            // for backward compatibility:
            if (configData.level[i] === 'warning') {
                configData.level[i] = 'warn';
            }
            levelObj[configData.level[i]] = true;
        }
        configData.level = levelObj;
    }

    // for backward compatibility:
    if (configData.level.warning) {
        configData.level.warn = configData.level.warning;
        delete configData.level.warning;
    }

    // set up loggerSource
    loggerSource.setup(configData);
};

// should be called when the application is about to exit
module.exports.clean = function (cb) {
    loggerSource.clean(cb);
};

module.exports.isEnabled = function (levelName) {
    if (configData && configData.level && configData.level[levelName]) {
        return true;
    }
    return false;
};

module.exports.setPrefix = function (p) {
    appPrefix = p;
    loggerSource.updatePrefix(appPrefix);
};

module.exports._setInternalPrefix = function (p) {
    prefix = p;
};

module.exports.create = function (name) {
    var p = createPrefix(appPrefix);
    // if name is not given, try to get the name from the caller file name
    var stack = new Error('').stack.split('\n');
    var callerFile;
    var filepath;
    // i starts from one because index 0 is always "Error"
    for (var i = 1, len = stack.length; i < len; i++) {
        if (stack[i].indexOf('gracelog/index.js') === -1) {
            callerFile = stack[i];
            break;
        }
    }
    if (callerFile) {
        filepath = callerFile.substring(callerFile.indexOf('/'), callerFile.lastIndexOf('.'));
        name = filepath;
    }

    if (!name) {
        name = 'unknown';
    }

    if (!configData) {
        module.exports.config();
    }

    return loggerSource.create(p, name, filepath);
};

module.exports.forceFlush = function (cb) {
    loggerSource.forceFlush(cb);
};

function createPrefix(p) {
    p = prefix;
    if (prefix !== '' && appPrefix) {
        p = prefix + '][' + appPrefix;
    } else if (appPrefix) {
        p = appPrefix;
    }
    return p;
}
