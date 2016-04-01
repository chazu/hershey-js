"use strict";

var CSV = require('comma-separated-values');
var _ = require('lodash');
var fsj = require('fs-jetpack');
var util = require("./util.js");

// Parsing glyph map data

function glyphMapping() {
  return new CSV(fsj.read("./data/charMapping.csv"), { header: true }).parse();
}

let parsedGlyphMapping = glyphMapping();

// Parsing charset data

function charsetFiles() {
  return fsj.list("./data/char-sets/");
}

function charsetNameFromFilename(filename) {
  return filename.split(".")[0];
}

function parseAndExpandRanges(string) {
  let matchData = string.match(/^(\d+)-(\d+)$/)

  if (matchData) {
    // console.log("Expanding range:", matchData);
    var range = [];
    for (let i=parseInt(matchData[1]) ;i <= parseInt(matchData[2]); i++) {
      range.push(i);
    }
    return range;
  } else {
    return parseInt(string);
  }
}

function charsetData(filename) {
  let lines          = fsj.read("./data/char-sets/" + filename).split("\n");
  let strings        = _.flatten(lines.map((line) => { return line.split(/\s+/); }));
  let noBlanks       = _.reject(strings, (string) => string.length === 0 );
  let rangesExpanded = _.flatten(noBlanks.map(parseAndExpandRanges));
  return rangesExpanded;
}

let charsetJSON = charsetFiles().map((filename) => {
  return {
    name: charsetNameFromFilename(filename),
    glyphIDs: charsetData(filename)
  };
});

// Parsing Glyph data

function hersheyGlyphDataLines() {
  return _.reject(fsj.read("./data/glyphs/hershey.dat").split("\n"), (line) => line.length === 0 );
}

function hersheyGlyphLinesToJson(lines) {
  return _.chain(lines).map(function(line) {
    // console.log(line);
    var id = parseInt(line.substring(0,5));
    var vertexCount = parseInt(line.substring(5, 8));
    var leftHandPosition = line.substring(8,9).hersheyAtChar(0);
    var rightHandPosition = line.substring(9,10).hersheyAtChar(0);
    var vertexString = line.substring(10, line.length).replace(/(\r\n|\n|\r)/gm,""); // remove \r\n
    var vertexStrings = util.splitVertices(vertexString);
    var vertices = util.calcVertices(vertexStrings).slice(0,vertexStrings.length - 2);

    // Get mapped identity if present
    let mapped = _.find(parsedGlyphMapping, function(item) {
      return item["id"] == id;
    });

    if (mapped) {
      console.log(mapped);
    }

    else {
      mapped = {"mapTo": null}
    }

    var yPoints = _.map(vertices, function(item) {
      return item["y"];
    });
    var maxGlyphHeight =  _.max(yPoints);
    var minGlyphHeight = _.min(yPoints);

    return {
      "id": id,
      "mappedTo": mapped["mapTo"],
      "vertexCount": vertexCount,
      "leftHandPosition": leftHandPosition,
      "rightHandPosition": rightHandPosition,
      "vertices": vertices,
      "width": Math.abs(leftHandPosition) + rightHandPosition,
      "height": maxGlyphHeight - minGlyphHeight
    };
  }).value();
}

let glyphsJSON = hersheyGlyphLinesToJson(hersheyGlyphDataLines());

fsj.remove('./src/glyphs.json');
fsj.write('./src/glyphs.json', glyphsJSON);

