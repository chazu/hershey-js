var hershey = require('./src/hershey');

debugger;

var scale = 5;
var offset = 30;
var penUp = false;

var canvas = document.getElementById('glyph-canvas');
var ctx = canvas.getContext("2d");

var glyph = hershey.glyphById(3926);

ctx.strokeStyle = "blue";
ctx.moveTo(0, 0);

var moveRelative = function (vertex) {
  transformedX = offset + vertex["x"] * scale;
  transformedY = offset + vertex["y"] * scale;
  console.log("Penup: " + transformedX + " " + transformedY);
  ctx.moveTo(offset + vertex["x"] * scale,
             offset + vertex["y"] * scale);
};

var lineRelative = function (vertex) {
  transformedX = offset + vertex["x"] * scale;
  transformedY = offset + vertex["y"] * scale;
  console.log("Line: " + transformedX + " " + transformedY);
  ctx.lineTo(transformedX, transformedY);
};

var drawGlyph = function() {
  ctx.beginPath()
  for (var i=0; i < glyph.vertices.length; i+=1) {
    if (glyph.vertices[i] === "PENUP") {
      penUp = true;
    } else {
      if (penUp == true) {
        moveRelative(glyph.vertices[i]);
        penUp = false;
      } else {
        lineRelative(glyph.vertices[i]);
      }
    }
  }
  ctx.closePath();
  ctx.stroke();
};

drawGlyph();
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(100, 100);
// ctx.closePath();
// ctx.stroke();
