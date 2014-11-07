#gracelog

###Access
```javascript
var gracelog = require('gracelog');
var logger = gracelog.create('nameToBeDisplayed');
```

###Configurations

###.config(configData [object])

```
var configData = {
	"bufferSize": <int> // log data buffer size in memory (bytes),
	"bufferFlushInterval": <int> // log data buffer auto flush interval in milliseconds,
	"file": "<log directory path> or false"
	"console": true or false,
	"remote": <object> or null/false,
	"color": true or false,
	"showHidden": true or false, // show hidden properties of object
	"depth": <integer> // recursive depth of object
	"level": [
		"verbose",
		"debug",
		"trace",
		"info",
		"warn",
		"error",
		"fatal",
	]
};

gracelog.config(configData);
```

### Configurations for log levels

There are 7 log levels in log module:

`verbose, debug, trace, info, warn, error, fatal`

Example:

```
var configData = {
	"console": true,
	"color": true,
	"level": [
		"info",
		"warn",
		"error",
		"fatal"
	]
};

gracelog.confoig(configData);
```

The above configurations will enable `info`, `warn`, `error`, and `fatal`.

The same configurations can be done by:

```
var configData = {
	"console": true,
	"color": true,
	"level": ">= info"
};

gracelog.config(configData);
```

***

### Buffering

Log module buffers log data in memory before outputting.

The defualt buffer size is 8kb (8129 bytes) and default bufferFlushInterval is 5 seconds (5000 ms).

***

#### file

If the path to file is set, gracelog will log into files.

Log files are auto-rotated by YYYY/MM/DD.

`"file": "path to log file directory" or false/null`

#### remote

If the configurations for `remote` logging is provided, gracelog sends log data via UDP protocol.

**Configurations**

```
var gracelog = require('gracelog');
var configData = {
	remote: {
		host: 'localhost',
		port: 8000
	}
};
gracelog.config(configData);
```

#### console

If set to true, gracelog will send log to stdout stream of node.js process.

Log module uses console object of node.js. This is a blocking operation. It is better to turn this option off in production.

`"console": true or false`

#### color

If set to true, gracelog will color log text.

Each log level has different color.

`"color": true or false`

#### showHidden

If set to true, gracelog will log hidden properties of objects.

`"showHidden": true or false`

#### depth

Decides how far log module should recursively display objects.

`"depth": <integer>`

#### level

Log module has 6 log levels. If set to false, gracelog will ignored that level.

Each log level can be configured.

```
"level": ">= verbose"
```

Or

```
"level": [
	"verbose",
	"debug",
	"info",
	"warn",
	"error",
	"fatal"
]
```

Or

```
"level": {
    "verbose": <boolean>,
    "debug": <boolean>,
    "info": <boolean>,
    "warn": <boolean>,
    "error": <boolean>,
    "fatal": <boolean>
}
```

***

##Events: *output*

```
gracelog.on('output', function (address, name, level, messageObj) {
	// address: IP address of the server
	// name: the name that was set on gracelog.create()
	// level: verbose, debug, info, warn, error, or fatal
	// messageObj: { message, timestamp }
});
```

***

###.clean(callback [function])

Cleans up logging data.

Useful to invoke this function before exiting an application process.

###.setPrefix(prefix [string])

Sets a prefix for each logging.

###.forceFlush(callback [function])

Forcefully flushes all buffered log data and write immediately.

###.create(logName [*string])

Returns an instance of logger object.

If `logName` is not provided, it will default to the file name (full path) of script calling it.

###.isEnabled(levelName [string])

Returns Boolean. If given log level name is enabled, it returns true. 

***

## Logger Object

###API: *verbose*

<pre>
void verbose(mixed data, [...])
</pre>

###API: *debug*

<pre>
void debug(mixed data, [...])
</pre>

###API: *table*

<pre>
void table(mixed data, [...])
</pre>

Outputs log at `debug` level and converts objects into tables.

Example:

```
var test = {
                        one: {
                                name: 'testOne',
                                value: 1,
                                language: '日本語',
                        },
                        two: {
                                name: 'testTwo<2>',
                                language: 'こんにちは',
                                ident: '02'
                        },
                        three: {
                                name: 'testThree<3>',
                                value: 3,
                                language: 'ありがとうございます',
                                list: ['A', 'B', 'C'],
                                map: { c: 'c', d: 'd' }
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
                        }
};
logger.table(test);
```

The output of the above code would be:

**NOTE:** Spcing is off in this example, but the actual output would have correct spacing.

```
+---------+--------------------+-----------------------------------------+------------------------+--------+----------+-----------------+
| (index) | name               | value                                   | language               | ident  | list     | map             |
+---------+--------------------+-----------------------------------------+------------------------+--------+----------+-----------------+
| one     | "testOne"          | 1                                       | "日本語"               |        |          |                 |
+---------+--------------------+-----------------------------------------+------------------------+--------+----------+-----------------+
| two     | "testTwo<2>"       |                                         | "こんにちは"           | "02"   |          |                 |
+---------+--------------------+-----------------------------------------+------------------------+--------+----------+-----------------+
| three   | "testThree<3>"     | 3                                       | "ありがとうございます" |        | A,B,C    | [object Object] |
+---------+--------------------+-----------------------------------------+------------------------+--------+----------+-----------------+
| five    | "魏民以夜光為怪石" |                                         | "chinese"              |        |          |                 |
+---------+--------------------+-----------------------------------------+------------------------+--------+----------+-----------------+
| six     | "korean"           | -200                                    | "해빛"                 |        | 10,20,30 |                 |
+---------+--------------------+-----------------------------------------+------------------------+--------+----------+-----------------+
```

###API: *trace*

`.trace()` outputs a stack trace for debugging.

###API: *info*

<pre>
void info(mixed data, [...])
</pre>

###API: *warn*

<pre>
void warn(mixed data, [...])
</pre>

###API: *warning*
Alias of warn
<pre>
void warning(mixed data, [...])
</pre>

###API: *error*

<pre>
void error(mixed data, [...])
</pre>

###API: *fatal*

<pre>
void fatal(mixed data, [...])
</pre>

***
