var _ = require('underscore');
var clone = require('clone');
module.exports = {
  "_data": require("./glyphs.json"),
  glyphById: function(id) {
    return _.find(this._data,
                  function(glyph) {
                    return glyph["id"] == id;
                  });
  },

  glyph: function(name) {
    return clone(_.find(this._data,
                  function(glyph) {
                    return glyph["mappedTo"] == name;
                  }));
  },

  stringVertices: function(string) {
    var upcased = string.toUpperCase();
    var offsetX = 0;
    var vertices = [];
    var options = arguments.length > 1 ? arguments[1] : null;


    for (i=0; i < upcased.length; i+=1) {
      var currentGlyph = this.glyph(string[i]);

      for (j=0; j < currentGlyph.vertices.length; j+=1) {
        if (currentGlyph.vertices[j] == "PENUP") {
          vertices.push("PENUP");
        } else {
          vertices.push({
            "x": currentGlyph.vertices[j]["x"] + offsetX,
            "y": currentGlyph.vertices[j]["y"]
          });
        }

      } // for each vertex
      offsetX += (currentGlyph.width + 1);
      vertices.push("PENUP");
    } // for each glyph
    return { "vertices": vertices };
  }
};
