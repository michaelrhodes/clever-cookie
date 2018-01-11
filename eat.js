var cookie = require('cookie')
var extend = require('object/extend')
var serialize = cookie.serialize

var defaults = {
  path: '/',
  maxAge: 0,
  sameSite: true,
  httpOnly: true
}

module.exports = eat

function eat (name, opts) {
  return serialize(name, '', opts ?
    extend(defaults, opts) :
    defaults)
}
