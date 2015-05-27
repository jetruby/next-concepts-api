/*global  describe, it, before*/
'use strict';
require('es6-promise').polyfill();
var app = require('../../server/app');

var expect  = require('chai').expect;
var request = require('request');

var host = 'http://localhost:3001';

describe('smoke tests for the app', function () {

	before(function() {
		return app.listen;
	});

	it('Should serve a good to go page', function(done) {
		request
		.get('http://localhost:3001/__gtg', function (req, res) {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});
	it('Should serve a uk current themes feed', function (done) {
		request
			.get(host + '/__concepts/current/uk', function (req, res) {
				expect(res.headers['content-type']).to.match(/json/);
				expect(res.statusCode).to.equal(200);
				done();
			});
	});

	it('Should serve an international current themes feed', function (done) {
		request
			.get(host + '/__concepts/current/international', function (req, res) {
				expect(res.headers['content-type']).to.match(/json/);
				expect(res.statusCode).to.equal(200);
				done();
			});
	});

});
