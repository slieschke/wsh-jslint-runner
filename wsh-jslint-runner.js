/*global ActiveXObject: false, WScript: false*/
(function () {
	'use strict';
	var filename, i, e,
		fso = new ActiveXObject('Scripting.FileSystemObject'),
		tool = this.JSLINT || this.JSHINT,
		exit = function (msg) {
			WScript.StdOut.WriteLine(msg);
			WScript.Quit();
		};
	if (!tool) {
		exit('jslint.js or jshint.js not found.');
	}
	if (WScript.Arguments.length === 0) {
		exit('No filename provided.');
	}
	filename = WScript.Arguments(0);
	if (!fso.FileExists(filename)) {
		exit('File "' + filename + '" not found.');
	}
	if (!tool(fso.OpenTextFile(filename, 1, false, -2).ReadAll())) {
		for (i = 0; i < tool.errors.length; i = i + 1) {
			e = tool.errors[i];
			if (e) {
				WScript.StdOut.WriteLine((tool === this.JSLINT ? 'JSLint' : 'JSHint') + ' at line ' + e.line + ' character ' + e.character + ': ' + e.reason);
				WScript.StdOut.WriteLine((e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, '$1')); // the regex trims leading/trailing whitespace
				WScript.StdOut.WriteLine();
			}
		}
	}
}());