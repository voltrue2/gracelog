var assert = require('assert');
var log = require('gracelog');
var logger;

describe('Logging', function () {

	it('Can set up logger', function () {

		log.config({
			bufferSize: 0,
			color: true,
			file: false
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

	it('Can log an object', function (done) {
		var obj = require('../package.json');
		logger.info(obj);
		done();
	});

	it('Can log as a table', function () {
		var test = {
			one: {
				id: 0,
				name: 'testOne',
				value: 1,
				language: '日本語',
			},
			two: {
				id: 1,
				name: 'testTwo<2>',
				language: 'こんにちは',
				ident: '02'
			},
			three: {
				id: 2,
				name: 'testThree<3>',
				value: 3,
				language: 'ありがとうございます',
				list: ['A', 'B', 'C'],
				map: { c: 'c', d: 'd' }
			},
			four: {
				id: 3,
				name: 'testFour',
				value: 4,
				language: 'Москве́',
				map: { a: 'a', b: 'b' }
			},
			five: {
				name: '魏民以夜光為怪石',
				language: 'chinese'
			},
			six: {
				name: 'korean',
				value: -200,
				language: '해빛',
				list: [10, 20, 30]
			},
			seven: {
				name: 'lorem ipsam',
				value: '، ان بعد, ثم عدم وقامت الآلاف للمجهود',
				language: 'arabic',
				list: [5, 6],
				map: { a: 500, b: 'd' },
				ident: '0056'
			}
		};
		var list = [1, 2, 3, 4, 5, 10, 123456];
		logger.table(test, list, 'test');
	});

});
