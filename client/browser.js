var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'hershey-test', {preload: preload, create: create});
var Hershey = require('./../src/hershey.js');
var _ = require('lodash');

function preload() {}

function create() {

  var graphics = game.add.graphics(0, 0);
  var vertices = Hershey.glyph(17).vertices;

  graphics.lineStyle( 2, 0x9999FF, 1);
  graphics.moveTo(0, 0);
  var penUp = false;

  var scale = 7;
  var offset = 60;

  var moveRelative = function (vertex) {
    graphics.moveTo(offset + vertex["x"] * scale,
                    offset + vertex["y"] * scale);
  };

  var lineRelative = function (vertex) {
    graphics.lineTo(offset + vertex["x"] * scale,
                     offset + vertex["y"] * scale);
  };

  // move to first point
  var startPoint = vertices.shift();
  moveRelative(startPoint);
  for (var i=0; i < vertices.length; i+=1) {
    if (vertices[i] === "PENUP") {
      console.log("setting penup true");
      penUp = true;
    } else {
      if (penUp == true) {
        console.log("pen is up! moving...");
        console.log(vertices[i]);
        moveRelative(vertices[i]);
        // graphics.moveTo(vertices[i]["x"] * scale,
        //                 vertices[i]["y"] * scale);
        penUp = false;
      } else {
        console.log(vertices[i]);
        lineRelative(vertices[i]);
        // graphics.lineTo(vertices[i]["x"] * scale + 50,
        //                 vertices[i]["y"] * scale + 50);
      }
    }
  }
}
