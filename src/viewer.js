var hershey = require('./hershey');
var hotkeys = require('hotkeys-js');

var currentGlyphIndex = 0;

var scale = 4;
var offset = 50;
var penUp = false;

var canvas = document.getElementById('glyph-canvas');
var ctx = canvas.getContext("2d");

var glyph;

ctx.strokeStyle = "blue";
ctx.moveTo(0, 0);

var moveRelative = function (vertex) {
  transformedX = offset + vertex["x"] * scale;
  transformedY = offset + vertex["y"] * scale;
  ctx.moveTo(offset + vertex["x"] * scale,
             offset + vertex["y"] * scale);
};

var lineRelative = function (vertex) {
  transformedX = offset + vertex["x"] * scale;
  transformedY = offset + vertex["y"] * scale;
  ctx.lineTo(transformedX, transformedY);
};

var drawGlyph = function() {
  glyph = hershey.glyphs[currentGlyphIndex];
  console.log(currentGlyphIndex);
  ctx.beginPath();
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

function clearGlyph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

drawGlyph();

hotkeys('left', function() {
  currentGlyphIndex -= 1;
  clearGlyph();
  drawGlyph();
});

hotkeys('right', function() {
  currentGlyphIndex += 1;
  clearGlyph();
  drawGlyph();
});
