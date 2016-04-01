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
    vertices = Hershey.string("Hello World", 10) // 10 is scale

    var aGlyph = Hershey.glyphById(10); // Strings also work
    console.log(aGlyph.vertices);          => [{"x": -3, "y" -5},...];
    console.log(aGlyph.vertexCount);       => 9;
    console.log(aGlyph.leftHandPosition);  => -5;
    console.log(aGlyph.rightHandPosition); => 5;

Right and left-hand positions indicate the horizontal boundaries of the glyph relative to it's local coordinate system, and are specified in the original data set.

## TODO

- Clean up data dir - move char set maps into subdir, vertex data into another
- Class for glyph
- Class for charset
- Refactor the ever-loving %$#!@ out of genChars
- Add paper.js viewer for character sets...
- Implement SVG to hershey script
- Implement export to .h or other formats using a template
