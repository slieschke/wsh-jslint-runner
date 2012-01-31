/*global ActiveXObject: false, JSLINT: false, WScript: false*/
(function () {
	'use strict';
	var e, filename, i,
		fso = new ActiveXObject('Scripting.FileSystemObject'),
		exit = function (msg) {
			WScript.StdOut.WriteLine(msg);
			WScript.Quit();
		};
	if (WScript.Arguments.length === 0) {
		exit('No filename provided.');
	}
	filename = WScript.Arguments(0);
	if (!fso.FileExists(filename)) {
		exit('File "' + filename + '" not found.');
	}
	if (!JSLINT(fso.OpenTextFile(filename, 1, false, -2).ReadAll())) {
		for (i = 0; i < JSLINT.errors.length; i = i + 1) {
			e = JSLINT.errors[i];
			if (e) {
				WScript.StdOut.WriteLine('JSLint at line ' + e.line + ' character ' + e.character + ': ' + e.reason);
				WScript.StdOut.WriteLine((e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, '$1')); // the regex trims leading/trailing whitespace
				WScript.StdOut.WriteLine();
			}
		}
	}
}());