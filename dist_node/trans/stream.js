/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/trans/stream.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("akh")["base"],
    liftM = __o["liftM"],
    liftM2 = __o["liftM2"],
    __o0 = require("akh")["structure"],
    Monoid = __o0["Monoid"],
    Monad = __o0["Monad"],
    Transformer = __o0["Transformer"],
    __o1 = require("nu-stream")["stream"],
    foldr = __o1["foldr"],
    map = __o1["map"],
    cons = __o1["cons"],
    concat = __o1["concat"],
    append = __o1["append"],
    NIL = __o1["NIL"],
    first = __o1["first"],
    isStream = __o1["isStream"],
    isEmpty = __o1["isEmpty"],
    StreamT, flip = (function(f) {
        return (function(x, y) {
            return f(y, x);
        });
    }),
    list = (function(x) {
        return cons(x, NIL);
    }),
    flatCons = (function(a, b) {
        return cons((((!isEmpty(a)) && isStream(first(a))) ? first(a) : a), b);
    });
(StreamT = (function(m) {
    var f, x, y, Instance = (function(run) {
            var self = this;
            (self.run = run);
        }),
        sequence = foldr.bind(null, liftM2.bind(null, ((f = flatCons), (function(x, y) {
            var a = y,
                b = x;
            return cons((((!isEmpty(a)) && isStream(first(a))) ? first(a) : a), b);
        }))), m.of(NIL)),
        mapM = ((x = map), (y = sequence), (function() {
            return y(x.apply(null, arguments));
        }));
    Monoid(Instance, new(Instance)(m.of(NIL)), (function(b) {
        var a = this;
        return new(Instance)(liftM2(append, StreamT.runStreamT(a), StreamT.runStreamT(b)));
    }));
    Monad(Instance, (function(x0) {
        var x1;
        return new(Instance)(m.of(((x1 = x0), cons(x1, NIL))));
    }), (function(f0) {
        var x0, y0, c = this;
        return new(Instance)(StreamT.runStreamT(c)
            .chain(mapM.bind(null, ((x0 = f0), (y0 = StreamT.runStreamT), (function(x1) {
                return y0(x0(x1));
            }))))
            .map(concat));
    }));
    Transformer(Instance, m, (function(t) {
        return new(Instance)(liftM(list, t));
    }));
    return Instance;
}));
(StreamT.runStreamT = (function(m) {
    return m.run;
}));
(module.exports = StreamT);