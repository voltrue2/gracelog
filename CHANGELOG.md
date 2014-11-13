# Change log

## Version 0.1.21

## Added

None

## Changed

#### Bug fix in .table()

The length of the (index) is now correctly measured.

## Deprecated

None

## Removed

None

***

## Version 0.1.20

## Added

None

## Changed

#### Default config improved

If no logging method found (console, file, or remote), it now falls back to use console as the default logging method.

## Deprecated

None

## Removed

None

***

## Version 0.1.19

## Added

None

## Changed

#### Bug fix in auto-default configurations

The logging for auto-default configurations caused uncaught exception.

## Deprecated

None

## Removed

None

***

## Version 0.1.18

## Added

## Changed

#### Improved support for CJK characters for .table()

## Deprecated

None

## Removed

None

***

## Version 0.1.17

## Added

## Changed

#### Bug fix in .table

Objects/arrays with different number of properties in each element created an incorrect tables.

This has been fixed.

## Deprecated

None

## Removed

None

***

## Version 0.1.16

## Added

## Changed

#### Support for multi-byte characters for .table()

## Deprecated

None

## Removed

None

***

## Version 0.1.15

## Added

#### .table() added to output objects as tables

The logging level is `debug`

## Changed

None

## Deprecated

None

## Removed

None

***

## Version 0.1.14

## Added

None

## Changed

#### Update README for remote logging via UDP

#### Added new unit tests

***

## Version 0.1.13

## Added

None

## Changed

#### Fix to default log name in some cases

The issue with file path containing no `(` solved.

***

## Version 0.1.12

## Added

None

## Changed

#### Default log name can now detect its own file name and ignores it

***

## Version 0.1.11

## Added

None

## Changed

#### create function does not require log name any more.

`gracelog.create([*logName])` does not require a `string` `logName`.

If `logName` is not provided, `gracelog` will default the log name to the file name of the script calling `.create()`.

***

## Version 0.1.10

## Added

#### Removed auto-creation of lost write stream for file logging added in version 0.1.8

The added new feature in version 0.1.8 was unstable in Linux Fedora. Thus removed for now.

This is for file logging.

## Changed

None

## Deprecated

None

## Removed

None

***

## Version 0.1.8

## Added

#### Added auto-creation of lost write stream if the target log files are removed or renamed

This is file for logging.

## Changed

None

## Deprecated

None

## Removed

None

***

## Version 0.1.7

## Added

None

## Changed

#### Text color changed

## Deprecated

None

## Removed

None

***

## Version 0.1.6

## Added

None

## Changed

#### Minor performance improvements

## Deprecated

None

## Removed

None

***

## Version 0.1.5

## Added

None

## Changed

## Improved Unit test

## Deprecated

None

## Removed

None

***

## Version 0.1.4

## Added

None

## Changed

## Readme updated

## Deprecated

None

## Removed

None

***

## Version 0.1.3

## Added

None

## Changed

## Readme updated

## Deprecated

None

## Removed

None

***

## Version 0.1.2

## Added

None

## Changed

#### Bug fix on clean()

## Deprecated

None

## Removed

None

***

## Version 0.1.1

## Created from gracenode's built-in log module

***
