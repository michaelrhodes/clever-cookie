var ms = require('ms')
var jwt = require('jsonwebtoken')
var extend = require('object/extend')
var secret = require('./secret')
var sign = jwt.sign

var defaults = {
  expiresIn: ms('2d') / 1000
}

module.exports = bake

function bake (payload, opts, cb) {
  if (typeof opts == 'function')
    cb = opts, opts = null

  var opt = extend(defaults, opts || {})
  var synchronous = typeof cb != 'function'

  return synchronous ?
    sign(payload, secret, opt) :
    sign(payload, secret, opt, cb)
}
