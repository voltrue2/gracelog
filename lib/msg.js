'use strict';

var util = require('util');
var color = require('./color');

var compress = false;
var showHidden = false;
var depth = 4;
var useTimestamp = false;

module.exports.setup = function (config) {
	color.setup(config);
    if (config.compress) {
        compress = true;
    }
	if (config.showHidden) {
		showHidden = true;
	}
	if (config.depth) {
		depth = config.depth;
	}
	if (config.useTimestamp) {
		useTimestamp = config.useTimestamp;
	}
};

module.exports.create = function (prefix, logName, levelName, args) {
	var timestamp;
	var date = new Date();
	if (useTimestamp) {
		timestamp = date.getTime();
	} else {
		var ymd = date.getFullYear() + '/' +
			pad(date.getMonth() + 1, 2) + '/' + pad(date.getDate(), 2);
		var his = pad(date.getHours(), 2) +
			':' + pad(date.getMinutes(), 2) + ':' +
			pad(date.getSeconds(), 2) + ':' + pad(date.getMilliseconds(), 3); 
		timestamp = ymd + ' ' + his;
	}
	var msg = ['[' + timestamp + ']' +
		(prefix ? '[' + prefix + ']' : '') + '<' + levelName + '>[' + logName + ']'];
	for (var key in args) {
		msg.push(createMsg(args[key]));
	}
	return { message: color.create(levelName, msg.join(' ')), timestamp: date.getTime() };
};

function createMsg(msgItem) {
	if (msgItem === null) {
		return 'null';
	}
	if (msgItem === undefined) {
		return 'undefined';
	}
	if (typeof msgItem === 'object') {
		if (msgItem instanceof Error) {
			msgItem = msgItem.message + '\n<stack trace>\n' + msgItem.stack;
		} else {
            if (compress) {
                msgItem = JSON.stringify(msgItem);
            } else {
			    msgItem = util.inspect(msgItem, { showHidden: showHidden, depth: depth });
		    }
        }
	}
	return msgItem;
}

function pad(n, digit) {
	n = n.toString();
	var len = n.length;
	if (len < digit) {
		var diff = digit - len;
		var padding = '';
		while (diff) {
			padding += '0';
			diff--;
		}
		n = padding + n;
	}
	return n;
}
