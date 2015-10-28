'use strict';

var content = require('../lib/content');
var taxonomyScores = {
	sections: 0.5,
	authors: 1,
	people: 2,
	organisations: 2,
	regions: 1,
	topics: 2,
	subjects: 0,
	brand: 1
};

module.exports = function (region, elastic, sample, limit) {
	var contentSources = elastic ? content.elastic : content.capi1;
	var topStories = region === 'uk' ? contentSources.ukFront.items : contentSources.usFront.items;
	var sampleSize = sample ? sample : 10;
	var limitSize = limit ? limit : 10;

	topStories = topStories.slice(0, sampleSize);

	var tags = {};

	topStories.forEach(function (a) {
		if (a) {
			a.metadata.forEach(function (tag) {
				var score = taxonomyScores[tag.taxonomy];
				if (tags[tag.idV1]) {
					tags[tag.idV1].count += score;
				} else {
					tags[tag.idV1] = {
						tag: tag,
						count: score
					};
				}

				if(tag.primary) {
					tags[tag.idV1].count += 2;
				}
			});
		}
	});

	return Object.keys(tags)
		.sort(function (a, b) {
			return tags[a].count === tags[b].count ? 0 : tags[a].count > tags[b].count ? -1 : 1;
		})
		.map(function (tagId) {
			return tags[tagId].tag;
		}).slice(0, limitSize);
};
