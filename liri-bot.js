require("dotenv").config();

var keys = require("./keys.js");
var BinT = require("band in town");
var spotify = require("spotify");
var OMDB = require("OMDB");
var request = require("request");
var fs = require("fs");
// take search grp
var userCommand = process.argv[2];
// take search time
var userSearch = process.argv[3];
for(var i=4; i< process.argv.length; i++){
    userSearch += "+" + process.argv[i];
}

//spotify

switch