var merge = require('xtend')
var cookie = require('cookie')
var jwt = require('jsonwebtoken')
var ms = require('ms')

var secret = process.env.JWT_SECRET || 'clever-cookie'

var defaults = {
  path: '/',
  maxAge: ms('2d') / 1000,
  sameSite: true,
  httpOnly: true
}

module.exports = bake

function bake (name, payload, opts) {
  opts = merge(defaults, opts || {})

  var token = jwt.sign(payload, secret, {
    expiresIn: opts.maxAge
  })

  return cookie.serialize(name, token, opts)
}
