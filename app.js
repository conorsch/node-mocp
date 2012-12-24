
var express = require('express');
var app = express();

//app.engine('.html', require('jade'));

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
  app.get('/*', mocp.toggle );

app.listen(3000);
console.log('Listening on port 3000');
