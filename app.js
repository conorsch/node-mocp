/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mocp = require('mocp')
  , http = require('http')
  , controls = require('./routes/controls')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var routes_fat = [ 
  'pause', 
  'play', 
  'next',
  'previous',
  'next',
  'toggle',
  'volup',
  'voldown',
];

routes_fat.forEach( function (route) { 
  app.get('/' + route, function (req, res) { 
    mocp[route](); // interpolate route name from array (above);
    res.send(''); // throw something at client;
  });
}); 

app.get('/controls', controls.display);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
