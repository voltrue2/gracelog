var loggerSource = require('./logger');
var EventEmitter = require('events').EventEmitter;

var configData = null;
var prefix = '';
var appPrefix = '';

module.exports = new EventEmitter();

loggerSource.events.on('output', function (address, name, level, data) {
	module.exports.emit('output', address, name, level, data);
});

module.exports.config = function (configIn) {
	
	configData = configIn;

	// there is no configurations, we create a default one
	if (!configData) {
		configData = {
			console: true,
			color: true,
			level: '>= verbose'
		};
		console.warn('<warn>[log] no configurations for log module found: created default configurations');
		console.log('<verbose>[log] default configurations:\n', {
			console: true,
			color: true,
			level: '>= verbose'
		});
	}

	// if config level is missing, we create a default one
	if (!configData.level) {
		configData.level = '>= verbose';
		console.warn('<warn>[log] no log level found: created default log level');
		console.log('<verbose>[log] default configurations:\n', config);
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
		var levels = ['verbose', 'debug', 'trace', 'info', 'warn', 'error', 'fatal'];
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
};

module.exports._setInternalPrefix = function (p) {
	prefix = p;
};

module.exports.create = function (name) {
	var p = prefix;
	if (prefix !== '' && appPrefix) {
		p = prefix + '][' + appPrefix;
	} else if (appPrefix) {
		p = appPrefix;
	}
	return loggerSource.create(p, name, configData);
};

module.exports.forceFlush = function (cb) {
	loggerSource.forceFlush(cb);
};
