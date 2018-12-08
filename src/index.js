'use strict';

// Require index.html so it gets copied to dist
// require('./index.html');

const {Elm} = require('./Main');
var app = Elm.Main.init({flags: 6});

// .embed() can take an optional second argument. This would be an object describing the data we need to start a program, i.e. a userID or some token
