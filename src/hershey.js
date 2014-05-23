var _ = require('lodash');
function Hershey () {

  return this;
};

Hershey._data = require("./glyphs.json");
Hershey.glyph = function(id) {
  console.log(id);
  return _.find(this._data,
                function(glyph) {
                  return glyph["id"] == id;
                });
}
module.exports = Hershey;
