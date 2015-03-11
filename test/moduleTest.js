var Hershey = require('./../src/hershey.js');

describe('hershey module', function() {
  describe('function glyphs', function() {
    it('should be a function', function() {
      expect(typeof Hershey.glyph).toBe('function');
    });
  });

  describe('function glyphById', function() {
    it('should be a function', function() {
      expect(typeof Hershey.glyphById).toBe('function');
    });
  });

  describe('function stringData', function() {
    it('should be a function', function() {
      expect(typeof Hershey.stringData).toBe('function');
    });
  });

  describe("function shiftVerticesForGlyph", function() {
    var testGlyph = {
      "vertices": [
        {"x": 0, "y": 0}
      ]
    };

    it('should be a function', function() {
      expect(typeof Hershey.shiftVerticesForGlyph).toBe('function');
    });

    it('should return a glyph with proper keys',function() {
      expect(typeof Hershey.shiftVerticesForGlyph(testGlyph, 2))
        .toEqual("object");
      expect(typeof Hershey.shiftVerticesForGlyph(testGlyph, 2)
             .vertices).toEqual("object");
    });

    it('should shift vertex x-values', function() {
      expect(Hershey.shiftVerticesForGlyph(testGlyph, 2).vertices[0]["x"])
        .toEqual(2);
    });

    it('should return the same number of vertices passed in', function() {
      expect(Hershey.shiftVerticesForGlyph(testGlyph, 2).vertices.length)
        .toEqual(testGlyph.vertices.length);
    })
  });

  describe("function shiftVerticesForGlyphs", function() {
    var testGlyphs = [
      {
        "vertices": [
          {"x": 0, "y": 0}
        ],
        "width": 5
      },{
        "vertices": [
          {"x": 0, "y": 0}
        ],
        "width": 0
      }];

    it('should be a function', function() {
      expect(typeof Hershey.shiftVerticesForGlyphs).toBe("function");
    });

    it('should shift vertices of glyphs in array', function() {
      expect(Hershey.shiftVerticesForGlyphs(testGlyphs)[1]
             .vertices[0]["x"]).toEqual(5);
    });

  });

  describe("function interleaveWithPenUp", function() {

    it('should be a function', function() {
      expect(typeof Hershey.interleaveWithPenUp).toEqual('function');
    });

    it('should add n - 1 to length of glyph array passed in with length n', function() {
      var testArray = [
        ["vertex", "vertex"],
        ["vertex", "vertex"]
      ];
      expect(Hershey.interleaveWithPenUp(testArray).length).toEqual(5);
    });

  });

  describe("function stringData", function() {

    // Key structure
    it('should return an object with key "vertices"', function() {
      expect(Hershey.stringData("A")["vertices"]).toBeDefined();
    });

    it('should return an object with key "width"', function() {
      expect(Hershey.stringData("A")["width"]).toBeDefined();
      expect(typeof Hershey.stringData("A")["width"]).toEqual("number");
    });

    it("should return union of vertices (plus penups for spaces)" +
             "for glyphs passed in", function() {
               var aVertexCount = Hershey.glyph("A").vertices.length;
               var bVertexCount = Hershey.glyph("B").vertices.length;
               var cVertexCount =
                 aVertexCount + bVertexCount + 1; // Add dat space

               expect(Hershey.stringData("AB").vertices.length)
                 .toEqual(cVertexCount);
             });

    it("should return width of total string", function() {

      var aWidth = Hershey.glyph("A").width;
      var bWidth = Hershey.glyph("B").width;

      var combinedWidth = aWidth + bWidth + 1; // Extra 1 for space

      expect(Hershey.stringData("AB").width).toBeDefined();
      expect(typeof Hershey.stringData("AB").width).toEqual("number");
      expect(Hershey.stringData("AB").width).toEqual(combinedWidth);
    });
  });
});
