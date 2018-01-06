var ms = require('ms')
var cookie = require('cookie')
var merge = require('xtend')
var sign = require('./token/sign')
var serialize = cookie.serialize

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
  var signed = typeof payload == 'string'

  return synchronous ?
    signed ?
      serialize(name, payload, opt) :
      serialize(name, sign(payload, exp), opt) :
    sign(payload, exp, function (err, encoded) {
      err ? cb(err) : cb(null, serialize(name, encoded, opt))
    })
}
