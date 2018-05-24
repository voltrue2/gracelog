'use strict';

var config = null;

module.exports.setup = function (configIn) {
	config = configIn;
};

module.exports.create = function (name, msgItem) {
	var res = '';
	// no color used
	if (!config || !config.color) {
		return msgItem;
	}
	// log with colors
	switch (name) {
		case 'verbose':
			res = '\x1b[0;90m' + msgItem + '\x1b[0m';
			break;
		case 'sys':
			res = '\x1b[0;36m' + msgItem + '\x1b[0m';
			break;
		case 'debug':
			res = '\x1b[0;34m' + msgItem + '\x1b[0m';
			break;
		case 'trace':
			res = '\x1b[0;33m' + msgItem + '\x1b[0m';
			break;
		case 'info':
			res = '\x1b[0;32m' + msgItem + '\x1b[0m';
			break;
		case 'warn':
			res = '\x1b[0;35m' + msgItem + '\x1b[0m';
			break;
		case 'error':
			res = '\x1b[0;31m' + msgItem + '\x1b[0m';
			break;
		case 'fatal':
			res = '\x1b[0;37m\x1b[41m' + msgItem + '\x1b[0m';
			break;
		default:
			res = msgItem;
			break;
	}
	return res;
};

