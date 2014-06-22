var Hershey = require('./../dist/hershey.js');

describe('hershey module', function() {

  it('should have a glyphs function', function() {
    expect(typeof Hershey.glyph).toBe('function');
  });

  it('should have a glyphById function', function() {
    expect(typeof Hershey.glyphById).toBe('function');
  });

  it('should have function stringVertices', function() {
    expect(typeof Hershey.stringVertices).toBe('function');
  });

  describe("function stringVertices", function() {
    it('should return an object with key "vertices"', function() {
      expect(Hershey.stringVertices("A")["vertices"]).toBeDefined();
    });

    describe("should return union of vertices for glyphs passed in", function() {
      var aVertexCount = Hershey.glyph("A").vertices.length;
      var bVertexCount = Hershey.glyph("B").vertices.length;

      var cVertexCount = aVertexCount + bVertexCount + 2; // Plus 2 spaces;

      expect(Hershey.stringVertices("AB").vertices.length).toEqual(cVertexCount);
    });

    describe("should return width of total string", function() {

      var aWidth = Hershey.glyph("A").width;
      var bWidth = Hershey.glyph("B").width;

      var combinedWidth = aWidth + 1 + bWidth; // Extra 1 for space

      expect(typeof Hershey.stringVertices("AB").width).toEqual("number");
      expect(Hershey.stringVertices("AB").width).toEqual(combinedWidth);
    });
  });
});
