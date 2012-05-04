/*!
 * ReduceStream
 * Copyright(c) 2012 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Stream = require("stream").Stream,
  util = require("util")

/**
 * Configuration.
 */

var noop = function () {}
  , DEBUG = console.log

/**
 * Exports.
 */

module.exports = ReduceStream;

/**
 * ReduceStream
 *
 * - Like Array#reduce but in a Stream
 *
 * @param {Object} options [optional]
 * @param {Function} reduce
 * @param initialValue
 * @constructor
 */

function ReduceStream(options, reduce, initialValue) {
  if (!(this instanceof ReduceStream)) return new ReduceStream(options, reduce, initialValue)

  if (typeof options === 'function') {
    initialValue = reduce
    reduce = options
    options = {}
  }

  this.options = options
  this.accumulated = options.accumulated
  if (!options.debug) DEBUG = noop

  this.reduce = reduce
  this.accumulator = initialValue
  this.counter = 0

  this.writable = true
  this.readable = true
}

util.inherits(ReduceStream, Stream);

/**
 * Write
 *
 * Apply reduce function to incoming data.
 *
 * @param chunk
 * @api public
 */

ReduceStream.prototype.write = function (chunk) {
  this.accumulator = this.reduce(this.accumulator, chunk, this.counter++)
  DEBUG(this.accumulator)

  if (this.accumulated) {
    this.emit('accumulated', this.accumulated(this.accumulator))
  }
};

ReduceStream.prototype.flush = function () {
  this.emit('data', this.accumulator)
  return true;
}

ReduceStream.prototype.end = function () {
  this.emit('end')
}

ReduceStream.prototype.pause = function () {
  this.paused = true
}

ReduceStream.prototype.resume = function () {
  this.paused = false
}
