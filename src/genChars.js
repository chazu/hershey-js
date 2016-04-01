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


function parseCharsets() {
  
}
// var fileData = fs.readFileSync("./data/hershey.dat", {
//   "encoding": "ascii"});

// var mappingData = fs.readFileSync("./data/charMapping.csv", {
//   "encoding": "ascii"});

// var parsedMapping = new CSV(mappingData, { header: true }).parse();

// var lines = fileData.split("\n");

// var result = [];

// _.chain(lines).each(function(line) {

//   var id = parseInt(line.substring(0,5));
//   var vertexCount = parseInt(line.substring(5, 8));
//   var leftHandPosition = line.substring(8,9).hersheyAtChar(0);
//   var rightHandPosition = line.substring(9,10).hersheyAtChar(0);
//   var vertexString = line.substring(10, line.length).replace(/(\r\n|\n|\r)/gm,""); // remove \r\n
//   var vertexStrings = util.splitVertices(vertexString);
//   var vertices = util.calcVertices(vertexStrings).slice(0,vertexStrings.length - 2);

//   // Get mapped identity if present
//   var mapped = _.find(parsedMapping, function(item) {
//     return item["id"] == id;
//   });

//   if (mapped) {
//     console.log(mapped);
//   }
//   else {
//     mapped = {"mapTo": null}
//   }

//   var yPoints = _.map(vertices, function(item) {
//     return item["y"];
//   });
//   var maxGlyphHeight =  _.max(yPoints);
//   var minGlyphHeight = _.min(yPoints);

//   result.push({
//     "id": id,
//     "mappedTo": mapped["mapTo"],
//     "vertexCount": vertexCount,
//     "leftHandPosition": leftHandPosition,
//     "rightHandPosition": rightHandPosition,
//     "vertices": vertices,
//     "width": Math.abs(leftHandPosition) + rightHandPosition,
//     "height": maxGlyphHeight - minGlyphHeight
//   });
// });

// resultString = JSON.stringify(result, null, 2);
// fs.writeFileSync('./src/glyphs.json', resultString);

// // Generate character set data
// var hmpFileNames = _.filter(fs.readdirSync('./data'), function(x) {
//   return x.match(/\.hmp$/);
// });

// var hmpFiles = _.map(hmpFileNames, function(x) {
//   var setName = x.match(/^(.+)\W/)[1];
//   return {"name": setName, "data": fs.readFileSync("./data/" + x, 'utf-8')};
// });

// _.each(hmpFiles, function(x) {
//   x.data = x.data.replace(/\s{2,}/g, " ");
//   x.data = x.data.replace(/\n/g, " ");
//   x.data = x.data.split(" ");
//   _.remove(x.data, function(x) {
//     return x == "";
//   });
// });

// // Now handle ranges in the parsed data...

// hmpFiles = _.map(hmpFiles, function(x) {
//   var newData = _.map(x.data, function(y) {

//     var matchData = y.match(/^(\d+)-(\d+)$/)

//     if (matchData) {
//       console.log("!!!!!!!!!");
//       console.log(matchData);
//       var range = [];
//       for (i=matchData[1];i <= matchData[2]; i++) {
//         range.push(i);
//       }
//       return range;
//     } else {
//       return parseInt(y);
//     }
//   });

//   return {"name": x.name, "data": newData};
// });

// hmpFiles = _.map(hmpFiles, function(x) {
//   return {"name": x.name, "data": _.flatten(x.data)};
// });

// console.log(hmpFiles);

// fs.writeFileSync('./src/rawSetData.json', JSON.stringify(hmpFiles));
