var fs = require('fs'),
	ejs = require('ejs'),
	bodyParser = require('body-parser'),
	express = require('express'),
	app = express();

	// Express Configuration
	var port = 8080;
    app.use(bodyParser({limit: '50mb'}));
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.engine('.html', require('ejs').__express);
    app.listen(port);

app.get('/', function(req, res){
	res.render('index.html');
});