var cookie = require('cookie')
var merge = require('xtend')
var serialize = cookie.serialize

var defaults = {
  path: '/',
  maxAge: 0,
  sameSite: true,
  httpOnly: true
}

module.exports = eat

function eat (name, opts) {
  opts = merge(defaults, opts || {})
  return serialize(name, '', opts)
}
