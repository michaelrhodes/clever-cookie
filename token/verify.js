var jwt = require('jsonwebtoken')
var omit = require('object/omit')
var secret = require('./secret')
var verify = jwt.verify

var junk = ['iat', 'exp']

module.exports = inspect

function inspect (encoded, cb) {
  var synchronous = typeof cb != 'function'

  return synchronous ?
    omit(verify(encoded, secret), junk) :
    verify(encoded, secret, function (err, decoded) {
      err ? cb(err) : cb(null, omit(decoded, junk))
    })
}
