
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

//  app.get('/play', mocp('--play'));

  app.get('/pause', function ( option ) {
          mocp( '--pause' );
          } );
  app.get('/play', function ( option ) {
          mocp( '--play' );
          } );
  app.get('/*', function ( option ) {
          mocp( '--toggle-pause' );
          } );

app.listen(3000);
console.log('Listening on port 3000');
