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
    expect(Hershey.stringVertices("A")["vertices"]).toBeDefined();
  });
});
