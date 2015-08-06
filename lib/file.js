var async = require('async');
var fs = require('fs');

var today = require('./today').get;

var writeOptions = {
	flags: 'a',
	mode: parseInt('0644', 8),
	encoding: 'utf8'
};

var streams = {};
var paths = {};

module.exports.setup = function (levelMap, path, oneFile) {
	
	if (!path) {
		// no file logging
		return;
	}

	// create map for file paths (enabled level ONLY)
	for (var levelName in levelMap) {
		var level = levelMap[levelName];
		if (level) {
			paths[levelName] = path + (oneFile ? 'log' : levelName);
		}
	}
};

module.exports.destroyAllStreams = function (cb) {
	for (var levelName in streams) {
		destroyWriteStream(levelName);
	}
	cb();
};

// cb is optional for auto buffer flushing
module.exports.log = function (levelName, msgData, cb) {
	async.forEach(msgData, function (item, next) {
		var stream = getWriteStream(levelName, item.time);
		if (stream) {
			return stream.write(item.msg + '\n', next);
		}
		next();
	}, cb || function () {});
};

function getWriteStream(levelName, timestamp) {
	// create log file path
	var path = paths[levelName];
	if (!path) {
		console.log('invalid log level given:', levelName, paths);
		return null;
	}
	
	var filePath = path + '.' + today(timestamp) + '.log';

	// check to see if the date-base file path is still valid
	if (streams[levelName] && streams[levelName].path !== filePath) {
		// the date has changed
		destroyWriteStream(levelName);
	}

	// create a new write stream if needed
	if (!streams[levelName]) {
		createWriteStream(levelName, filePath);
	}
	return streams[levelName].stream;
}

function createWriteStream(levelName, filePath) {
	var stream;
	try {
		// create a new write stream
		stream = fs.createWriteStream(filePath, writeOptions);
	} catch (e) {
		console.error('[file.log] failed to create a write stream:', e);
	}
	// add the new stream to stream map
	streams[levelName] = {
		path: filePath,
		stream: stream
	};
}

function destroyWriteStream(levelName) {
	if (streams[levelName]) {
		streams[levelName].stream.end();
		delete streams[levelName];
	}
}
