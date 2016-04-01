"use strict";

var CSV = require('comma-separated-values');
var _ = require('lodash');
var fsj = require('fs-jetpack');
var util = require("./util.js");

function charsetFiles() {
  return fsj.list("./data/char-sets/");
}

function charsetNameFromFilename(filename) {
  return filename.split(".")[0];
}

function parseAndExpandRanges(string) {
  let matchData = string.match(/^(\d+)-(\d+)$/)

    if (matchData) {
      console.log("Expanding range:", matchData);
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

let data = charsetFiles().map((filename) => {
  return {
    name: charsetNameFromFilename(filename),
    glyphIDs: charsetData(filename)
  };
});

console.log(data);
