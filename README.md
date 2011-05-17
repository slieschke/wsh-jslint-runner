WSH JSLint Runner
=================

A Windows Scripting Host runner for [JSLint][1].

You will need to download the latest version of [`jslint.js`][2] to the same directory as these files.

This enables running JSLint as an [EditPlus][3] user tool with the following configuration:

* Menu text: `JSLint`
* Command: `cscript.exe`
* Argument: `C:\path\to\jslint.wsf //Nologo $(FilePath)`
* Action: _Capture output_
* Output Pattern:
    * Regular expression: `^JSLint at line ([0-9]+) character ([0-9]+):.*$`
    * File name: _None_
    * Line: _Tagged Expression 1_
    * Column: _Tagged Expression 2_

[1]: http://www.jslint.com
[2]: https://github.com/douglascrockford/JSLint/raw/master/jslint.js
[3]: http://www.editplus.com