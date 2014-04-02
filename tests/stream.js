var Stream = require('../index').stream;

var stream = require('nu-stream').stream;

var flattr = function(x) {
    return stream.isStream(x) ?
        stream.toArray(stream.map(flattr, x)) :
        x;
};

var runEager = function(c) {
    return flattr(Stream.runStream(c));
};



exports.simple_of = function(test) {
    var c = Stream.of(3);
    
    test.deepEqual(
        runEager(c),
        [3]);
    
    test.done();
};

exports.of_stream = function(test) {
    var c = Stream.of(stream.cons(3, stream.NIL));
    
    test.deepEqual(
        runEager(c),
        [[3]]);
    
    test.done();
};

exports.chain_simple = function(test) {
    var c = Stream.of(3)
        .chain(function(x) {
            return Stream.of(x * 2);
        })
        .chain(function(x) {
            return Stream.of(x + 1);
        })
        .chain(function(x) {
            return Stream.of(x - 5);
        });;

    test.deepEqual(
        runEager(c),
        [2]);
    
    test.done();
};


exports.chain_flatten = function(test) {
    var c = Stream.of(3)
        .chain(function(x) {
            return Stream.of(stream.from([x, x * 2]));
        });

    test.deepEqual(
        runEager(c),
        [3, 6]);
    
    test.done();
};


exports.chain_order= function(test) {
    var c = Stream.of(1)
        .chain(function(x) {
            return Stream.of(stream.from([x, x + 1]))
        })
        .chain(function(x) {
            return Stream.of(stream.from([x, x * 2]));
        });

    test.deepEqual(
        runEager(c),
        [1, 2, 2, 4]);
    
    test.done();
};

exports.chain_empty= function(test) {
    var c = Stream.of(1)
        .chain(function(x) {
            return Stream.of(stream.NIL)
        })
        .chain(function(x) {
            return Stream.of(stream.from([x, x * 2]));
        });

    test.deepEqual(
        runEager(c),
        []);
    
    test.done();
};

exports.chain_list = function(test) {
    var c = Stream.of(1)
        .chain(function(x) {
            return Stream.of(stream.from([stream.from([x]), stream.from([x * 2])]))
        })
        .chain(function(x) {
            return Stream.of(stream.from([
                 stream.append(
                     x,
                     stream.from([stream.first(x) + 1]))]))
        });

    test.deepEqual(
        runEager(c),
        [[1, 2], [2, 3]]);
    
    test.done();
};


exports.list_concat = function(test) {
    var c = Stream.zero
        .concat(Stream.of(1))
        .concat(Stream.of(2))
        .concat(Stream.of(3))

    test.deepEqual(
        runEager(c),
        [1, 2, 3]);
    
    test.done();
};


exports.map = function(test) {
    var c = Stream.zero
        .concat(Stream.of(1))
        .concat(Stream.of(2))
        .map(function(x) { return x * x; })
        .concat(Stream.of(3))

    test.deepEqual(
        runEager(c),
        [1, 4, 3]);
    
    test.done();
};