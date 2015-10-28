/*global console*/
'use strict';
var Poller = require('ft-poller');

const ft = require('next-ft-api-client').content;

var Page = function () {
	this.items = [];
};

Page.prototype.init = function(pageId, contentArea, noBody) {
	this.poller = new Poller({
		url: 'http://api.ft.com/site/v1/pages/' + pageId +'/' + contentArea + '-content?apiKey=' + process.env.apikey,
		refreshInterval: 5 * 60 * 1000,
		parseData: function (data) {
			if (noBody) {
				this.items = data.pageItems;
			} else {
				let opts = {
					uuid: data.pageItems.map(function (article) {
						return article.id;
					}),
					index: 'v3_api_v2'
				};

				ft(opts)
					.then(function (articles) {
						console.log('fetched ' + articles.length + ' article' + (articles.length === 1 ? '' : 's') + ' from ' + pageId);
						this.items = articles;
					}.bind(this));
			}
		}.bind(this)
	});
	this.poller.start({
		initialRequest: true
	});

	this.poller.on('error', function (err) {
		console.log('Polling error:', err);
	});

	return this;
};

module.exports = Page;
