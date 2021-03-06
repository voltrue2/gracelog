var assert = require('assert');
var log = require('../index');
var logger;

describe('Logging', function () {

  it('Can log w/o calling config()', function () {
    var l = log.create();
    l.verbose('boo');
    l.sys('boo');
    l.debug('boo');
    l.table(['boo', 'foo']);
    l.trace('boo');
    l.info('boo');
    l.warn('boo');
    l.error('boo');
    l.fatal('boo');
  });

  it('Can set up logger', function () {

    log.config({
      stackdriver: true,
      rotationType: 'hour',
      useTimestamp: true,
      bufferSize: 0,
      color: true,
      console: true,
      compress: true,
            file: process.cwd() + '/test/logs/'
    });

  });

  it('Can actually log', function () {

    logger = log.create('test');

    logger.verbose('verbose message');
    logger.sys('sys message');
    logger.debug('debug message');
    logger.trace('trace message');
    logger.info('info message');
    logger.warn('warn message');
    logger.error('error message');
    logger.fatal('fatal message');

  });

  it('Can emit "output"', function (done) {

    var calledDone = false;
    log.on('output', function (address, name, level, msg) {
      assert(address);
      assert(name);
      assert(level);
      assert(msg);
      if (level === 'fatal' && !calledDone) {
        calledDone = true;
        done();
      }
    });

    logger.verbose('test "output"');
    logger.sys('test "output"');
    logger.debug('test "output"');
    logger.trace('test "output"');
    logger.warn('test "output"');
    logger.error('test "output"', new Error('well it is a test error'));
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
        map: { c: 'c', d: 'd', e: [0,1,2,3,4,5], f: { a:'A',b:'B',c:'C'}, g: '{one:1, two:2, three:3}' }
      },
      four: {
        id: 3,
        name: 'testFour12345678901234567890123456789012345678901234567890123456789012345678901234567890',
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

  it('Can listen on "output" event 10 times and remove the listener', function (done) {
    var counter = 0;
    var max = 10;
    var listener = function () {
      counter += 1;
      if (counter === max) {
        log.removeListener('output', listener);
        done();
      }
      logger.verbose('foo', counter);
    };
    log.on('output', listener);
    logger.verbose('foo', counter);
  });

  it('Can log a null value in a same line', function () {
    logger.debug('this is a null >', null);
  });

  it('Can log an undefined value in a same line', function () {
    logger.debug('this is a null >', undefined);
  });

  it('Can change the prefix', function () {
    log.setPrefix('TEST2');
    logger.debug('prefix updated');
  });

  it('Can create table data', function () {
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
        map: { c: 'c', d: 'd', e: [0,1,2,3,4,5], f: { a:'A',b:'B',c:'C'}, g: '{one:1, two:2, three:3}' }
      },
      four: {
        id: 3,
        name: 'testFour12345678901234567890123456789012345678901234567890123456789012345678901234567890',
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
    var table1 = logger.createTable(test);
    var table2 = logger.createTable(list);
    logger.verbose(table1, table2);
    logger.sys(table1, table2);
    logger.debug(table1, table2);
    logger.trace(table1, table2);
    logger.info(table1, table2);
    logger.warn(table1, table2);
    logger.error(table1, table2);
    logger.fatal(table1, table2);
  });

  it('Can remove all log files from the test (' + process.cwd() + '/test/logs/*.log)', function (done) {
    var exec = require('child_process').exec;
    exec('rm -rf ' + process.cwd() + '/test/logs/*.log', done);
  });

});
