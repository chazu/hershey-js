String.prototype.hersheyAtChar = function (n) {
  var relativeTo = "R".charCodeAt(0);
  return this.charCodeAt(0) - relativeTo;
};

var _ = require("lodash");

var util = {};

String.prototype.slice2Chars = function() {
  var currentStr = this;
  var res = [];
  var times = Math.floor(this.length / 2 + 2);

  _.times(times, function(ch) {
    res.push(currentStr.slice(0,2));
    currentStr = currentStr.slice(2);
  }, this);
  return res;
};

util.charToASCII = function (ch) {

};

util.splitVertices = function (strang) {
  return strang.slice2Chars();
};

util.calcVertices = function(vertices) {
  return _.map(vertices, function(x) {
    if (x == " R") {
      return "PENUP";
    } else {
      if (x) {
        if (x.length < 2) {
          x = x.concat(" "); // TODO Wat?
        }
        return {
          "x": x[0].hersheyAtChar(0),
          "y": x[1].hersheyAtChar(0)
        };
      }
    }
  });
};

module.exports = util;
