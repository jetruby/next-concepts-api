'use strict';
var raven = require('express-errors-handler');

var ftErrorHandler = (process.env.NODE_ENV === 'production') ? function (err) {
	raven.captureMessage(err);
} : function (err) {
	console.log(err);
};

exports.ft = require('ft-api-client')(process.env.apikey, {
	errorHandler: ftErrorHandler,
	strict: false,
	elasticSearchUri: process.env.ELASTIC_SEARCH_URL
});
