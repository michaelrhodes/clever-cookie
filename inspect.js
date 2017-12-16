var cookie = require('cookie')
var jwt = require('jsonwebtoken')
var omit = require('object.omit')
var secret = require('./secret')
var parse = cookie.parse
var verify = jwt.verify

module.exports = inspect

function inspect (cookie, name) {
  var parsed = verify(parse(cookie)[name], secret)
  return omit(parsed, ['iat', 'exp'])
}
