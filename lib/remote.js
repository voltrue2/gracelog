var async = require('async');
var dgram = require('dgram');

var ip = require('./ip');

var config = null;

var client;

module.exports.setup = function (configIn) {
	
	if (!configIn) {
		// no remote logging
		return;
	}

	if (!configIn.port || !configIn.host) {
		console.error('Error: missing remoteServer configurations');
		console.error(configIn);
		return;
	}

	config = configIn;

	client = dgram.createSocket('udp4');
};


// cb is optional for auto buffer flushing
module.exports.log = function (levelName, msgData, cb) {
	async.forEach(msgData, function (item, next) {
		client.send(item.msg, 0, item.msg.length, config.port, config.host, next);
	}, cb || function () {});
};

