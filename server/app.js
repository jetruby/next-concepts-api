'use strict';

var express = require('ft-next-express');

var port = process.env.PORT || 3001;

var app = module.exports = express();

app.get('/__gtg', function(req, res) {
	res.status(200).end();
});

app.get('/__concepts/top-stories/uk', require('./controllers/concepts'));
app.get('/__concepts/top-stories/international', require('./controllers/concepts'));
app.get('/', function (req, res) {
	res.send(404);
});

module.exports.listen = app.listen(port, function() {
	console.log('Listening on ' + port);
});
