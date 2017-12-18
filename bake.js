var cookie = require('cookie')
var jwt = require('jsonwebtoken')
var ms = require('ms')
var merge = require('xtend')
var secret = require('./secret')
var serialize = cookie.serialize
var sign = jwt.sign

var defaults = {
  path: '/',
  maxAge: ms('2d') / 1000,
  sameSite: true,
  httpOnly: true
}

module.exports = bake

function bake (payload, name, opts, cb) {
  if (typeof opts == 'function')
    cb = opts, opts = null

  var opt = merge(defaults, opts || {})
  var exp = { expiresIn: opt.maxAge }
  var synchronous = typeof cb != 'function'

  return synchronous ?
    serialize(name, sign(payload, secret, exp), opt) :
    sign(payload, secret, exp, function (err, encoded) {
      err ? cb(err) : cb(null, serialize(name, encoded, opt))
    })
}
