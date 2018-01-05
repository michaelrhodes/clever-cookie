var cookie = require('cookie')
var verify = require('./token/verify')
var parse = cookie.parse

module.exports = inspect

function inspect (cookie, name, cb) {
  var parsed = parse(cookie)
  var encoded = parsed[name]
  var synchronous = typeof cb != 'function'

  return synchronous ?
    verify(encoded) :
    verify(encoded, cb)
}
