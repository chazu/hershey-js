# Hershey Fonts For JS/Node

This repository contains a module which contains Hershey Vector Font data for use in the browser or in node.js. It additionally includes the hershey data in its raw form, and a script which converts them into JSON vertex data.

## Building/Tools

We're using gulp, bower, and browserify. Here's how to compile the module:

Install node.js (comes with npm)

Then from inside repository directory:

    npm install
    node src/genChars.js
    gulp

This should build the project into the dist/ directory.


## Usage

    var Hershey = require('hershey');
    var aGlyph = Hershey.glyphById(10); // Strings also work
    console.log(aGlyph.vertices);          => [{"x": -3, "y" -5},...];
    console.log(aGlyph.vertexCount);       => 9;
    console.log(aGlyph.leftHandPosition);  => -5;
    console.log(aGlyph.rightHandPosition); => 5;

Right and left-hand positions indicate the horizontal boundaries of the glyph relative to it's local coordinate system, and are specified in the original data set.


## TODO

- Add all files of hershey data - individual sets in addition to whole thing
- Expand mapping csv
- Allow loading of specific character sets

- Write gulp task to run genChars for you. Too lazy at the moment.
- Write script to build modules for all glyphs/specific sets
- Move craptastic glyph browser facility into its own repo...Also clean it up, its terrible
- Write script to convert svg files into glyphs in JSON format
- Write script to convert original dataset into form more suitable for use with C++/OpenGL (???)

