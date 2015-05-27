'use strict';

var Page = require('../jobs/page');
// Periodically load these searches in to memory
var pollForContent = function (source) {
	return {
		ukFront: new Page(source).init('4c499f12-4e94-11de-8d4c-00144feabdc0', 'main'),
		usFront: new Page(source).init('b0ed86f4-4e94-11de-8d4c-00144feabdc0', 'main')
	};
};

module.exports = {
	capi1: pollForContent('capi1'),
	elastic: pollForContent('elastic')
};
