var _ = require('lodash');
var fs = require('fs');

var util = require("./util.js");
var fileData = fs.readFileSync("./data/hershey.dat", {
  "encoding": "ascii"});

var lines = fileData.split("\n");

var result = [];
console.log(lines.length + " glyphs converted.");

_.chain(lines).each(function(line) {
  var id = parseInt(line.substring(0,5));
  var vertexCount = parseInt(line.substring(5, 8));
  var leftHandPosition = line.substring(8,9).hersheyAtChar(0);
  var rightHandPosition = line.substring(9,10).hersheyAtChar(0);
  var vertexString = line.substring(10, line.length).replace(/(\r\n|\n|\r)/gm,""); // remove \r\n
  var vertexStrings = util.splitVertices(vertexString);
  var vertices = util.calcVertices(vertexStrings).slice(0,vertexStrings.length - 2);

  result.push({
    "id": id,
    "vertexCount": vertexCount,
    "leftHandPosition": leftHandPosition,
    "rightHandPosition": rightHandPosition,
    "vertexString": vertexString,
    "vertices": vertices
  });
});

resultString = JSON.stringify(result, null, 2);
fs.writeFileSync('./src/glyphs.json', resultString);
