# Change log

## Version 0.1.11

## Added

None

## Changed

#### create function does not require log name any more.

`gracelog.create([*logName])` does not require a `string` `logName`.

If `logName` is not provided, `gracelog` will default the log name to the file name of the script calling `.create()`.

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
