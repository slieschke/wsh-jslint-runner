/*global ActiveXObject: false, WScript: false*/
/*jslint evil: true*/
(function () {
	'use strict';
	var filename, i, e,
		fso = new ActiveXObject('Scripting.FileSystemObject'),
		options = {},
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
	if (fso.FileExists('options.js')) {
		// Ideally this would use JSON.parse instead of eval but I haven't yet figured how to get the JSON object in a WSH script.
		eval('options = ' + fso.openTextFile('options.js', 1, false, -2).ReadAll() + ';');
	}
	if (!tool(fso.OpenTextFile(filename, 1, false, -2).ReadAll(), options)) {
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