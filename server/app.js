'use strict';

const express = require('ft-next-express');
const port = process.env.PORT || 3001;
const app = module.exports = express();
const logger = require('ft-next-express').logger;

app.get('/__gtg', function(req, res) {
	res.status(200).end();
});

app.get('/__concepts/top-stories/uk', require('./controllers/concepts'));
app.get('/__concepts/top-stories/international', require('./controllers/concepts'));
app.get('/', function (req, res) {
	res.send(404);
});

module.exports.listen = app.listen(port, function() {
	logger.info('Listening on ' + port);
});
