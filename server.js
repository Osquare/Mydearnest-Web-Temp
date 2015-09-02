var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(function (res, req, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/withRouter.html'));
});

app.listen(3002);
console.log('running at port 3002');
