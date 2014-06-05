var _ = require('lodash');
function Hershey () {

  return this;
};

Hershey._data = require("./glyphs.json");

Hershey.glyphById = function(id) {
  console.log(id);
  return _.find(this._data,
                function(glyph) {
                  return glyph["id"] == id;
                });
}

Hershey.glyph = function(name) {
  return _.find(this._data,
                function(glyph) {
                  return glyph["mapTo"] == name;
                });
};

Hershey.stringVertices = function(string) {
  var upcased = string.toUpperCase();
  var offsetX = 0
  var vertices = [];
  for (i=0; i < upcased.length - 1; i+=1) {
    var currentGlyph = Hershey.glyph(string[i]);
    for (j=0; j < currentGlyph.vertices.length - 1; j+=1) {
      vertices.push({
        "x": currentGlyph.vertices[i] + offsetX,
        "y": currentGlyph.vertices[i]
      })
      offsetX += (currentGlyph.width + 1);
    }
  }
  return vertices;
};
module.exports = Hershey;
