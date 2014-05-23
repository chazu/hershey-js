var express = require('express');

var app = express();
console.log(__dirname);
app.use(express.static(__dirname));

console.log("/","Glyph browser listening on port 8080");
app.listen(8080);
