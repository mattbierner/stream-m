/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stream.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/identity", "./trans/stream"], (function(require, exports, Identity, StreamT) {
    "use strict";
    var Stream;
    (Stream = StreamT(Identity));
    var x = StreamT.runStreamT,
        y = Identity.runIdentity;
    (Stream.runStream = (function(x0) {
        return y(x(x0));
    }));
    return Stream;
}));