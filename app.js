
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
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

app.get('/users', user.list);

var mocp = function( option ) {

    var exec = require('child_process').exec,
        child;

    child = exec('mocp ' + option,
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
}

  mocp.play = function () {
      mocp('--play');
  };
  mocp.pause = function () {
      mocp('--pause');
  };

  mocp.toggle = function () {
      mocp('--toggle-pause');
  };

  app.get('/pause', mocp.pause );
  app.get('/play', mocp.play );
  app.get('/toggle', mocp.toggle );
  app.get('/controls', controls.display);
  app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
