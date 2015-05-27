'use strict';

var cacheControl = require('../utils/cache-control');
var currentThemes = require('../lib/concepts');

module.exports = function (req, res, next) {
	var region = (req.path === '/__concepts/top-stories/international' ? 'international' : 'uk');

	res.set(cacheControl);
		try {
			res.json(currentThemes(region, res.locals.flags.elasticSearchItemGet, req.query.sample, req.query.limit));
		} catch(e) {
			next(e);
		}
};
