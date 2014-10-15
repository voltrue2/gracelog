var assert = require('assert');
var log = require('gracelog');
var logger;

describe('Logging', function () {

	it('Can set up logger', function () {

		log.config({
			bufferSize: 0,
			color: true,
			console: true,
			file: false,
			level: '>= verbose'
		});

		logger = log.create('test');

	});

	it('Can actually log', function () {

		logger.verbose('verbose message');
		logger.debug('debug message');
		logger.trace('trace message');
		logger.info('info message');
		logger.warn('warn message');
		logger.error('error message');
		logger.fatal('fatal message');

	});

	it('Can emit "output"', function (done) {
		
		log.on('output', function (address, name, level, msg) {
			assert(address);
			assert(name);
			assert(level);
			assert(msg);
			if (level === 'fatal') {
				done();
			}
		});

		logger.verbose('test "output"');
		logger.debug('test "output"');
		logger.trace('test "output"');
		logger.warn('test "output"');
		logger.error('test "output"');
		logger.fatal('test "output"');

	});

	it('Can get a default log name', function (done) {
		var logger2 = log.create();
		logger2.debug('I am not "unkown!"');
		done();
	});

});
