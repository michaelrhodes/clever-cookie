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

function bake (name, payload, opts, exp) {
  opts = merge(defaults, opts || {})
  exp = { expiresIn: opts.maxAge }
  return serialize(name, sign(payload, secret, exp), opts)
}
