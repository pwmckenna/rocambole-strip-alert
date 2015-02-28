'use strict';
var assert = require('assert');
var rocambole = require('rocambole');
var stripAlert = require('./index');

function strip(str) {
	return rocambole.moonwalk(str, function (node) {
		stripAlert(node);
	}).toString();
}

it('should strip alert statement', function () {
	assert.equal(strip('function test(){alert("foo");}'), 'function test(){void 0;}');
	assert.equal(strip('function test(){window.alert("foo");}'), 'function test(){void 0;}');
	assert.equal(strip('var test = () => alert("foo");'), 'var test = () => void 0;');
	assert.equal(strip('"use strict";alert("foo");foo()'), '"use strict";void 0;foo()');
	assert.equal(strip('if(alert){alert("foo", "bar");}'), 'if(alert){void 0;}');
	assert.equal(strip('foo && alert("foo");'), 'foo && void 0;');
	assert.equal(strip('if (foo) alert("foo")\nnextLine();'), 'if (foo) void 0\nnextLine();');
});

it('should never strip away non-debugging code', function () {
	var t = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
	assert.equal(strip(t), t);
});
