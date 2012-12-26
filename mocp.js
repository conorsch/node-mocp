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

    this.play = function () {
      mocp('--play');
    };
    this.pause = function () {
      mocp('--pause');
    };

    this.toggle = function () {
      mocp('--toggle-pause');
    };

    this.volup = function () {
      mocp('--volume +10');
    };

    this.voldown = function () {
      mocp('--volume -10');
    };

    this.next = function () {
      mocp('--next');
    };
    this.previous = function () {
      mocp('--previous');
    };

}

module.exports = new mocp;
