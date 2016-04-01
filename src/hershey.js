var _ = require('lodash');
var clone = require('clone');

function generatePenUpArray (length) {
  // Return array of "PENUP" with length length
  memo = [];
  while (memo.length < length) {
    memo.push("PENUP");
  }
  return memo;
}

module.exports = {
  interleaveWithPenUp: function (glyphArray) {
    // Given a 2d array of vertices for glyphs, interleave with "PENUP"
    var interleaved = _.chain(glyphArray)
      .zip(generatePenUpArray(glyphArray.length - 1))
      .flatten()
      .value();
    interleaved.pop();
    return interleaved;
  },
  shiftVerticesForGlyph: function(glyph, shiftX) {
    // Return a new glyph with the vertices shifted
    newGlyph = clone(glyph);
    newGlyph.vertices = _.map(glyph.vertices,
                              function(vertex) {
                                if (vertex === "PENUP") {
                                  return "PENUP";
                                } else {
                                  return {
                                    "x": vertex.x + shiftX,
                                    "y": vertex.y
                                  };
                                }
                              }, this);
    return newGlyph;
  },
  shiftVerticesForGlyphs: function(glyphs) {
    var kerning = 1; // Space between chars
    var offsetX = 0;

    return _.map(glyphs, function(glyph) {
      newGlyph = this.shiftVerticesForGlyph(glyph, offsetX)
      offsetX += glyph.width;
      return newGlyph;
    }, this);
  },
  // DATA
  _data: require("./glyphs.json"),
  _rawSetData: require("./rawSetData.json"),
  // Glyph Getters
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

  // String to vertex methods
  stringData: function(string) {
    var options = arguments.length > 1 ? arguments[1] : null;
    string = string.toUpperCase();

    var glyphs = _.chain(string).map(function(item) {
      return this.glyph(item);
    }, this).flatten().value();

    glyphs = this.shiftVerticesForGlyphs(glyphs);

    var stringWidth = _.reduce(glyphs,
                               function(memo, x) { return memo + x.width },
                               0) + glyphs.length - 1;

    var reducedToVertices = _.chain(glyphs).map(function(glyph) {
      return glyph === "PENUP" ? "PENUP" : glyph.vertices;
    }).value();

    var interleaved = this.interleaveWithPenUp(reducedToVertices);
    return { "vertices": interleaved,
             "width": stringWidth
           };
  }
};
