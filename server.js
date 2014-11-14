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
    app.set('root', __dirname);
    app.engine('.html', require('ejs').__express);
    app.listen(port);


function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

/*app.use('/s', function(req, res, next){
  var key = req.query['api-key'];

  // key isnt present
  if (!key) return next(error(400, 'api key required'));

  // key is invalid
  if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  // all good, store req.key for route access
  req.key = key;
  next();
});
*/

var port = Number(process.env.PORT || 5000);

var user = '';

app.use(function(req,res,next){
    req.user = user;
    next();
});

app.get('/', function(req, res){
	res.render('index.html');
});

app.listen(port);