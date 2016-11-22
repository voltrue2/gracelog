# Change log

## Version 0.6.8

## Added

None

## Changed

#### Performance improvements

## Deprecated

None

## Remoed

None

***

## Version 0.6.7

## Added

None

## Changed

#### Writting log data exception catch causes unexpected problem with cleaning up: Removed

## Deprecated

None

## Removed

None

***

## Version 0.6.6

## Added

#### logger.createTable() added

## Changed

#### Writting log data exception catch improved

## Deprecated

None

## Removed

None

***

## Version 0.6.5

## Added

None

## Changed

#### Improved exception catching on writting log data

## Deprecated

None

## Removed

***

## Version 0.6.4

## Added

None

## Changed

#### Removed default warn log for no configurations

## Deprecated

None

## Removed

None

***

## Version 0.6.3

## Added

None

## Changed

#### Removed all dependencies

## Deprecated

None

## Removed

None

## Version 0.6.0

## Added

None

## Changed

#### No longer auto-setup with default config

## Version 0.5.3

## Added

None

## Changed

#### Bug Fix: remote logging now supports cluster.

Refer to github commit log: https://github.com/voltrue2/gracelog/commit/3280a91e71ac292b3887c3a0b564b776278aa78a

#### Bug Fix: remote logging was broken

Refer to github commit log: https://github.com/voltrue2/gracelog/commit/549bf4113170f18fd68d6a0c1515472e758a16ac

## Deprecated

None

## Removed

None

***

## Version 0.5.2

## Added

None

## Changed

#### Fixed: Removed unnecessary console.log() from the code

## Deprecated

None

## Removed

None

***

## Version 0.5.1

## Added

#### oneFile<bool> option added to config object

If set `true`, file logging will be combined into one file instead of multipule files per logging level.

## Changed

None

## Deprecated

None

## Removed

None

## Version 0.4.1

## Added

None

## Changed

#### .table() now displays parsed object instead of [Object object]

#### .table() truncates strings longer than 50

## Deprecated

None

## Removed

None

***

## Version 0.4.0

## Added

None

## Changed

#### Log file rotation name is now accurate to the log data in each file

#### Bug fix in auto flushing

The bug was that if there was no buffered log to flush in one level, it was exiting the auto flush w/o flushing the other level.

## Deprecated

None

## Removed

None

***

## Version 0.3.0

## Added

#### Added useTimestamp to configuration object

By given `useTimestamp`(Boolean) in the configuration object, the logger users Unix timestamp instead of the server local time.

**NOTE**: File rotation still uses server local time for file names.

## Changed

None

## Deprecated

None

## Removed

None

*** 

## Version 0.2.3

## Added

None

## Changed

#### outputs null and undefined

## Deprecated

None

## Removed

None

***

## Version 0.2.2

## Added

None

## Changed

#### logging a null value in the same line

#### Now uses wrapper functions for events instead of creating extra events

## Deprecated

None

## Removed

None

***

## Version 0.2.1

## Added

None

## Changed

#### Bug fix in .table() for 0 as a value

## Deprecated

None

## Removed

None

***

## Version 0.2.0

## Added

#### new dependency wcwidth added

## Changed

#### The character length issue with multibyte characters for .table() fixed

## Deprecated

None

## Removed

None

***

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
