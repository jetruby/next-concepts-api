/*global console*/
'use strict';
var Poller = require('ft-poller');

var ft = require('../utils/api').ft;

var Page = function (source) {
	this.fetchMethod = source === 'elastic' ? 'mget' : 'get';
	this.items = [];
};

Page.prototype.init = function(pageId, contentArea, noBody) {
	this.poller = new Poller({
		url: 'http://api.ft.com/site/v1/pages/' + pageId +'/' + contentArea + '-content?apiKey=' + process.env.apikey,
		interval: 5*60*1000,
		parseData: function (data) {
			if (noBody) {
				this.items = data.pageItems;
			} else {
				ft[this.fetchMethod](data.pageItems.map(function (article) {
						return article.id;
					}))
					.then(function (articles) {
						console.log('fetched' + articles.length + ' articles from ' + pageId);
						this.items = articles;
					}.bind(this));
			}
		}.bind(this)
	});
	this.poller.start({
		initialRequest: true
	});
	return this;
};

module.exports = Page;
