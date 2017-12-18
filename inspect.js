var cookie = require('cookie')
var jwt = require('jsonwebtoken')
var omit = require('object.omit')
var secret = require('./secret')
var parse = cookie.parse
var verify = jwt.verify

var junk = ['iat', 'exp']

module.exports = inspect

function inspect (cookie, name, cb) {
  var parsed = parse(cookie)
  var encoded = parsed[name]
  var synchronous = typeof cb != 'function'

  return synchronous ?
    omit(verify(encoded, secret), junk) :
    verify(encoded, secret, function (err, decoded) {
      err ? cb(err) : cb(null, omit(decoded, junk))
    })
}
