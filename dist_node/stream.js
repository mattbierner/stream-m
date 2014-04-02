/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stream.kep'
 * DO NOT EDIT
*/
"use strict";
var Identity = require("akh")["identity"],
    StreamT = require("./trans/stream"),
    Stream;
(Stream = StreamT(Identity));
var x = StreamT.runStreamT,
    y = Identity.runIdentity;
(Stream.runStream = (function(x0) {
    return y(x(x0));
}));
(module.exports = Stream);