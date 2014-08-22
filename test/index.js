var log = require('../');
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
			console.log('address:', address);
			console.log('name:', name);
			console.log('level:', level);
			console.log('message:', msg);
			done();
		});

		logger.verbose('test "output"');

	});

});
