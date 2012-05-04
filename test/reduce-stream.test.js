var assert = require('assert')
  , mocha = require('mocha')
  , Stream = require('stream').Stream
  , ReduceStream = require('..')

//console.dir(ReduceStream)

describe('ReduceStream', function () {

  describe('reduceStream', function () {
    var adder = function (acc, x, i) { return acc + x }
      , reduceStream = ReduceStream(adder, 0)

    it('should be a StreamReduce', function(done) {
      assert.ok(reduceStream instanceof ReduceStream)
      done()
    })
    it('should be a Stream', function(done) {
      assert.ok(reduceStream instanceof Stream)
      done()
    })
    it('should have a `reduce` function', function(done) {
      assert.equal(typeof reduceStream.reduce, 'function')
      done()
    })
    it('should have an `accumulator` set to `initialValue`', function(done) {
        assert.equal(typeof reduceStream.accumulator, 'number')
        assert.deepEqual(reduceStream.accumulator, 0)
        done()
    })
    it('should accumulate the value written to it', function(done) {
        reduceStream.write(5)
        assert.deepEqual(reduceStream.accumulator, 5)
        done()
    })
    it('should have a counter at 1', function(done) {
        assert.deepEqual(reduceStream.counter, 1)
        done()
    })
  })
})